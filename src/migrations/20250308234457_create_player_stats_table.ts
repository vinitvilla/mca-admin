// migrations/[timestamp]_create_player_stats_table.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('player_stats', (table) => {
    table.increments('id').primary();
    table.integer('playerId').notNullable().references('id').inTable('players').onDelete('CASCADE');
    table.integer('matchId'); // Optional, for future match table
    table.integer('runsScored').defaultTo(0);
    table.integer('ballsFaced').defaultTo(0);
    table.integer('wicketsTaken').defaultTo(0);
    table.decimal('oversBowled', 3, 1).defaultTo(0.0); // e.g., 10.2 overs
    table.integer('runsConceded').defaultTo(0);
    table.integer('catches').defaultTo(0);
    table.integer('stumpings').defaultTo(0);
    table.integer('runOuts').defaultTo(0);
    table.date('date').notNullable(); // Date of stats
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('player_stats');
}