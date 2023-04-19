import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const CHANNEL = 'afor_digital';
export const IGNORED_USERS = ["nightbot", "afordibot", "streamlabs"];
