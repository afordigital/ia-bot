import personalities from '../personalities.json' assert { type: 'json' }

export const getPersonality = () => {
  const index = Math.floor(Math.random() * personalities.length)
  return personalities[index]
}
