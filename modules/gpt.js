import { getPersonality } from './getPersonality.js'
import {KEY_GPT, MAX_CHARACTERS, MODEL, API_URL} from '../constants/openAi.js';
console.log({KEY_GPT, MAX_CHARACTERS, MODEL, API_URL})

export const askGPT = async message => {
  const cleanMessage = message.replaceAll(`"`, "'")
  const { personality, context } = getPersonality()

  const prompt = `Imagina que eres un usuario del chat. Otro usuario ha dicho: "${cleanMessage}". ${context}. El contexto del chat es temática informática y programación. Máximo ${MAX_CHARACTERS} caracteres.`

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${KEY_GPT}`
  }

  const body = {
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    model: MODEL,
    max_tokens: MAX_CHARACTERS,
    n: 1,
    stop: null
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })

    const data = await response.json()

    const { total_tokens } = data.usage
    const { content } = data.choices[0].message

    return {
      personality,
      total_tokens,
      content
    }
  } catch (error) {
    return {
      personality: 'error',
      total_tokens: 0,
      content: 'No se ha podido completar la petición.'
    }
  }
}
