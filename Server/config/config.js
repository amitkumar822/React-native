import {config} from "dotenv";
config();

export const PORT = process.env.PORT || 3001
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD || ""