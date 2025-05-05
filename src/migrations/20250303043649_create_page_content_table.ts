import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('page_content', (table) => {
    table.increments('id').primary();
    table.string('pageId').notNullable().references('pageId').inTable('pages').onDelete('CASCADE');
    table.string('fieldId').notNullable(); // e.g., "title", "description"
    table.text('content').notNullable(); // Actual content
    table.string('contentType').notNullable(); // "text", "image", "richText"
    table.integer('maxChar'); // Optional max length
    table.boolean('required').defaultTo(false);
    table.string('version').notNullable(); // "version-123456789" or "temporary"
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.unique(['pageId', 'fieldId', 'version']); // Ensure unique field per page/version
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('page_content');
}