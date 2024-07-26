import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (table) => {
        table.integer('entity_id').unsigned();  // This will link to an ID in either the athletes or businesses table
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', (table) => {
        table.dropColumn('entity_id');
    });
}
