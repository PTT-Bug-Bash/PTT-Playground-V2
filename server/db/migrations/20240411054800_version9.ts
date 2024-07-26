
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('role').notNullable();
    table.timestamp('registered').notNullable().defaultTo(knex.fn.now());
    table.string('token');
    table.timestamp('createdtime').notNullable().defaultTo(knex.fn.now());
    table.boolean('emailverified').notNullable().defaultTo(false);
    table.boolean('tokenusedbefore').notNullable().defaultTo(false);
    table.timestamp('reset_password_expires');
    table.string('reset_password_token');
    table.boolean('reset_password_token_used').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
