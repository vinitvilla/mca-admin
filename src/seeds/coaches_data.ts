// src/seeds/coaches.ts
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('coaches').del();

  // Inserts seed entries
  await knex('coaches').insert([
    {
      firstName: 'Ravi',
      lastName: 'Shastri',
      specialization: 'Batting',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Andy',
      lastName: 'Flower',
      specialization: 'Batting',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Shane',
      lastName: 'Bond',
      specialization: 'Bowling',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Mike',
      lastName: 'Hesson',
      specialization: 'All-round',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}