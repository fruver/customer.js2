import dotenv from 'dotenv';

// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

export default {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DBURI: process.env.DBURI,
  DBNAME: process.env.DBNAME,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
};
