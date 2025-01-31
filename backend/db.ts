import knex from "knex";
import config from "./knex/knexfile";

const db = knex(config);

export default db;