import knex from "knex";
import config from "./knex/knexfile";

const environment = process.env.NODE_ENV || "development";

if (!config[environment]) {
  throw new Error(`Knex configuration for environment "${environment}" not found.`);
}

const db = knex(config[environment]);

console.log("Database config:", config[environment]);

export default db;