import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tide_events", (table) => {
        table.increments("id").primary();
        table.integer("day_tide_id").references("id").inTable("day_tides").onDelete("CASCADE");
        table.float("height").notNullable();
        table.timestamp("time").notNullable();
        table.enu("type", ["high", "low"]).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("tide_events");
}