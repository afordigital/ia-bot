import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

export const KEY_GPT = process.env.KEY_GPT;
export const MAX_CHARACTERS = 100;
export const MODEL = 'gpt-3.5-turbo';
export const API_URL = 'https://api.openai.com/v1/chat/completions';