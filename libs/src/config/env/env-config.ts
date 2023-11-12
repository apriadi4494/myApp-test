import * as dotenv from 'dotenv';
dotenv.config();

export const APP_HOST: string = process.env.APP_HOST;
export const APP_PORT: string = process.env.APP_PORT;
export const APP_PORT_CHAT: string = process.env.APP_PORT_CHAT;
export const NODE_ENV: string = process.env.NODE_ENV;

export const DB_URL_USER: string = process.env.DB_URL_USER;
export const DB_URL_CHAT: string = process.env.DB_URL_CHAT;

export const JWT_SECRET: string = process.env.JWT_SECRET;
export const TOKEN_EXPIRED: string = process.env.TOKEN_EXPIRED;
export const REFRESH_TOKEN_EXPIRED: string = process.env.REFRESH_TOKEN_EXPIRED;

export const SWAGGER_URL: string = process.env.SWAGGER_URL;

export const RABBIT_URL: string = process.env.RABBIT_URL;
export const QUEUE_NAME: string = process.env.QUEUE_NAME;

export const SOCKET_CORS: string = process.env.SOCKET_CORS;
