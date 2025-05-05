// seeds/initial_pages.ts
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Clear the table first to avoid duplicates
  await knex('roles').del();  // Insert sample roles (2 entries)
  await knex('roles').insert([
    {
      name: 'admin',
      description: 'Administrator with full access',
    },
    {
      name: 'coach',
      description: 'Coach with limited access',
    },
    {
      name: 'player',
      description: 'Player with limited access',
    }
  ]);
}
