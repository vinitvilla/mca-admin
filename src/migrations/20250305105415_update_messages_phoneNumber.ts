import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  //rename a column
  await knex.schema.table('messages', function(table) {
    table.renameColumn('phoneNumber', 'phone_number');
  });
}


export async function down(knex: Knex): Promise<void> {
  //undo the column rename
  await knex.schema.table('messages', function(table) {
    table.renameColumn('phone_number', 'phoneNumber');
  });
}

