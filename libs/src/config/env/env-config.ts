import * as dotenv from 'dotenv';
dotenv.config();

export const APP_HOST: string = process.env.APP_HOST;
export const APP_PORT: string = process.env.APP_PORT;
export const APP_NODE: string = process.env.APP_NODE;

export const DB_NAME: string = process.env.DB_NAME;
export const DB_URL: string = process.env.DB_URL;

export const JWT_SECRET: string = process.env.JWT_SECRET;
export const TOKEN_EXPIRED: string = process.env.TOKEN_EXPIRED;
export const REFRESH_TOKEN_EXPIRED: string = process.env.REFRESH_TOKEN_EXPIRED;

export const SWAGGER_URL: string = process.env.SWAGGER_URL;
