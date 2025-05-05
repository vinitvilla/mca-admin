import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('config', (table) => {
    table.increments('id').primary();
    table.string('key').notNullable().unique();
    table.string('value').notNullable();
  }).then(() =>
    knex('config').insert({ key: 'latest_version', value: 'version-123456789' })
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('config');
}