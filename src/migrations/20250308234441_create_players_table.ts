// migrations/[timestamp]_create_players_table.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('players', (table) => {
    table.increments('id').primary();
    table.string('userId').references('uid').inTable('users').onDelete('SET NULL'); // Optional link to users
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.date('dateOfBirth').notNullable();
    table.string('battingStyle').notNullable(); // e.g., "Right-hand", "Left-hand"
    table.string('bowlingStyle'); // e.g., "Right-arm fast", "Leg-spin"
    table.string('position').notNullable(); // e.g., "Batsman", "Bowler", "All-rounder"
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('players');
}