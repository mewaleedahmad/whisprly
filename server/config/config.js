import dotenv  from 'dotenv';
dotenv.config();

export const CLIENT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.CLIENT_URL;
