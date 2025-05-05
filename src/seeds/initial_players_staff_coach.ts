// seeds/initial_cricket_data.ts
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('players').del();
  await knex('player_stats').del();
  await knex('coaches').del();
  await knex('staffs').del();

  // Players
  await knex('players').insert([
    {
      firstName: 'Virat',
      lastName: 'Kohli',
      dateOfBirth: '1988-11-05',
      battingStyle: 'Right-hand',
      bowlingStyle: 'Right-arm medium',
      position: 'Batsman',
    },
    {
      firstName: 'Jasprit',
      lastName: 'Bumrah',
      dateOfBirth: '1993-12-06',
      battingStyle: 'Right-hand',
      bowlingStyle: 'Right-arm fast',
      position: 'Bowler',
    },
  ]);

  // Player Stats
  await knex('player_stats').insert([
    {
      playerId: 1,
      runsScored: 85,
      ballsFaced: 60,
      wicketsTaken: 0,
      oversBowled: 0.0,
      runsConceded: 0,
      catches: 1,
      stumpings: 0,
      runOuts: 0,
      date: '2025-03-01',
    },
    {
      playerId: 2,
      runsScored: 10,
      ballsFaced: 15,
      wicketsTaken: 3,
      oversBowled: 8.2,
      runsConceded: 35,
      catches: 0,
      stumpings: 0,
      runOuts: 0,
      date: '2025-03-01',
    },
  ]);

  // Coaches
  await knex('coaches').insert([
    { firstName: 'Ravi', lastName: 'Shastri', specialization: 'Batting' },
  ]);

  // Staffs
  await knex('staffs').insert([
    { firstName: 'John', lastName: 'Smith', role: 'Physiotherapist' },
  ]);
}
