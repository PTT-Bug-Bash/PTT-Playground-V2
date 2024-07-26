import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("locations", (table) => {
        table.geometry("curr_location").alter();
        table.geometry("affiliation_location").alter();
        table.geometry("home_location").alter();
        table.string("home_city").alter();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("locations", (table) => {
        table.point("curr_location").alter();
        table.string("affiliation_location").alter();
        table.point("home_location").alter();
        table.point("home_city").alter();
    })
}

