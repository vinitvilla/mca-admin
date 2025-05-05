import { Knex } from 'knex';

import 'dotenv/config';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    database: process.env.NEXT_PUBLIC_DB_NAME,
    port: Number(process.env.NEXT_PUBLIC_DB_PORT),
  },
  migrations: {
    directory: './src/migrations', // Relative to project root
  },
  seeds: {
    directory: './src/seeds', // Optional, if using seeds
  },
};

export default config;