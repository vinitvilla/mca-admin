// src/db/migrations/[timestamp]_create_messages_tables.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table.string('full_name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.text('message').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('message_reads', (table) => {
    table.increments('id').primary();
    table.integer('message_id').notNullable().references('id').inTable('messages').onDelete('CASCADE');
    table.integer('read_by_user_id').notNullable(); // Add reference to users table if exists
    table.timestamp('read_at').defaultTo(knex.fn.now());
    table.unique(['message_id', 'read_by_user_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('message_reads');
  await knex.schema.dropTable('messages');
}