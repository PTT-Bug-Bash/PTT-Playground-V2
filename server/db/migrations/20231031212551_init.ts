import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("athletes", (table) => {
        table.increments("id").primary().unique();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("school");
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("phone").notNullable();
        table.geometry("location");
        table.string("address").notNullable();
        table.string("city").notNullable();
        table.string("state").notNullable();
        table.string("zip").notNullable();
        table.timestamps(true, true);
        table.string("image_url")
    })
    .createTable("businesses", (table) => {
        table.increments("id").primary();
        table.string("business_name").notNullable();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("phone").notNullable();
        table.geometry("location");
        table.string("address").notNullable();
        table.string("city").notNullable();
        table.string("state").notNullable();
        table.string("zip").notNullable();
        table.timestamps(true, true);
        table.string("image_url")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("athletes").dropTableIfExists("businesses");
}

