import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    /*return knex.schema.createTable("dive_spot_fish", (table) => {
        table.integer("dive_spot_id").unsigned().notNullable();
        table.integer("fish_id").unsigned().notNullable();
        
        table.foreign("dive_spot_id").references("id").inTable("dive_spots").onDelete("CASCADE");
        table.foreign("fish_id").references("id").inTable("fish").onDelete("CASCADE");

        table.primary(["dive_spot_id", "fish_id"]);
    });*/
}

export async function down(knex: Knex): Promise<void> {
    //return knex.schema.dropTableIfExists("dive_spot_fish");
}
