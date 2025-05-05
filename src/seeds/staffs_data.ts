// src/seeds/staffs.ts
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('staffs').del();

  // Inserts seed entries
  await knex('staffs').insert([
    {
      firstName: 'Emma',
      lastName: 'Thompson',
      role: 'Manager',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Liam',
      lastName: 'Carter',
      role: 'Groundskeeper',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Olivia',
      lastName: 'Bennett',
      role: 'Physiotherapist',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Noah',
      lastName: 'Foster',
      role: 'Equipment Manager',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}