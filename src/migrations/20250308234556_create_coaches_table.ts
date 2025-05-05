// migrations/[timestamp]_create_coaches_table.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('coaches', (table) => {
    table.increments('id').primary();
    table.string('userId').references('uid').inTable('users').onDelete('SET NULL'); // Optional link to users
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('specialization').notNullable(); // e.g., "Batting", "Bowling"
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('coaches');
}