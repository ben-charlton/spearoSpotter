import { Knex } from "knex";
import * as dotenv from "dotenv";
import path from "path";

const envPath = process.env.NODE_ENV === 'production' ? '/app/.env' : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

const config: { [key: string]: Knex.Config } = {
  production: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_NAME,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_NAME,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  }
};

export default config;