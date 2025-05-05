import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('messages', table => {
    table.string('phoneNumber');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('messages', table => {
    table.dropColumn('phoneNumber');
  });
}

