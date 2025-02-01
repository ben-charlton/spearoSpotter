import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("weather_forecast", (table) => {
        table.increments("id").primary();
        table.string("location")
        table.timestamp("request_time").defaultTo(knex.fn.now());
        table.timestamp("forecast_time");
        table.float("latitude");
        table.float("longitude");
        table.float("wave_height");
        table.float("cloud_cover");
        table.float("air_temperature");
        table.float("swell_direction");
        table.float("swell_height");
        table.float("swell_period");
        table.float("secondary_swell_period");
        table.float("secondary_swell_direction");
        table.float("secondary_swell_height");
        table.float("water_temperature");
        table.float("wind_direction");
        table.float("wind_speed");
      });
    }

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("weather_forecast");
}