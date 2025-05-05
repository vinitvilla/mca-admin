// src/seeds/players.ts
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Inserts seed entries
  await knex('players').insert([
    {
      firstName: 'Virat',
      lastName: 'Kohli',
      dateOfBirth: '1988-11-05',
      battingStyle: 'Right-hand',
      bowlingStyle: 'Right-arm medium',
      position: 'Batsman',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Joe',
      lastName: 'Root',
      dateOfBirth: '1990-12-30',
      battingStyle: 'Right-hand',
      bowlingStyle: 'Right-arm off-spin',
      position: 'Batsman',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2Fjoe.jpg?alt=media&token=example-token',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Kane',
      lastName: 'Williamson',
      dateOfBirth: '1990-08-08',
      battingStyle: 'Right-hand',
      bowlingStyle: 'Right-arm off-spin',
      position: 'Batsman',
      imageUrl: null, // No image for this player
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Jasprit',
      lastName: 'Bumrah',
      dateOfBirth: '1993-12-06',
      battingStyle: 'Right-hand',
      bowlingStyle: 'Right-arm fast',
      position: 'Bowler',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2Fjasprit.jpg?alt=media&token=example-token',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Ben',
      lastName: 'Stokes',
      dateOfBirth: '1991-06-04',
      battingStyle: 'Left-hand',
      bowlingStyle: 'Right-arm fast',
      position: 'All-rounder',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2Fben.jpg?alt=media&token=example-token',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}