import type { Knex } from "knex";

// migrations/<timestamp>_add_image_url_to_players.js
exports.up = function (knex: Knex) {
  return knex.schema.table('players', (table) => {
    table.string('imageUrl').nullable(); // Add nullable imageUrl column
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.table('players', (table) => {
    table.dropColumn('imageUrl'); // Rollback by dropping the column
  });
};