import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('matches', (table) => {
        table.string('status');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('matches', (table) => {
        table.dropColumn('status');
    });
}
