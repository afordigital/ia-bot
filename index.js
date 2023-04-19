import tmi from 'tmi.js'
import { askGPT } from './modules/gpt.js'
import { USER, PASSWORD, CHANNEL, IGNORED_USERS } from './constants/twitch.js';


const client = new tmi.Client({
  options: { debug: false },
  identity: {
    username: USER,
    password: PASSWORD
  },
  channels: [CHANNEL]
})

client.connect()

client.on('message', async (channel, tags, message, self) => {
  if (self) return
  
  const {username, ['display-name']: displayName } = tags

  if (IGNORED_USERS.includes(username)) {
    return
  }

  const isChosen = Math.floor(Math.random() * 3) === 0
  const isLongMessage = message.length > 30

  if (isChosen && isLongMessage) {
    const { personality, total_tokens, content } = await askGPT(message)
    if (personality === "error" || total_tokens === 0) {
      return
    }

    client.say(channel, `@${username}: ` + personality + ' -> ' + content)
    console.log(` ${displayName}: ${message}`)
    console.log(`personalidad: ${personality} respuesta: ${content}`)
  } else if (username === 'niv3k_el_pato') {
    client.say(channel, '*quack*')
  }
})
