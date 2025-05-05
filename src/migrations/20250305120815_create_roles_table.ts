import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique(); // e.g., "admin", "coach"
    table.text('description');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  }).then(() =>
    knex('roles').insert([
      { name: 'admin', description: 'Administrator with full access' },
      { name: 'coach', description: 'Coach with limited access' },
    ])
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('roles');
}