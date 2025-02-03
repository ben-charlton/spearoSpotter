import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("dive_spots", (table) => {
      table.increments("id").primary();
      table.string("name", 100).notNullable();
      table.float("latitude").notNullable();
      table.float("longitude").notNullable();
      table.float("facing_direction");
      table.string("protected_from");
      table.float("swell_sensitivity");
      table.float("wind_sensitivity");
      table.float("tide_sensitivity");
      table.float("refraction_sensitivity");
      table.text("description");
      table.integer("depth", 50);
      table.text("entrance");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("dive_spots");
  }