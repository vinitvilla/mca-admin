import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('uid').notNullable().unique(); // Firebase Auth UID
    table.string('email').notNullable().unique();
    table.string('displayName');
    table.integer('roleId').notNullable().references('id').inTable('roles').onDelete('RESTRICT');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}