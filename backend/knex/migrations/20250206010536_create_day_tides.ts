import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("day_tides", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable();
        table.string("location").notNullable();
        table.unique(["date", "location"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("day_tides");
}