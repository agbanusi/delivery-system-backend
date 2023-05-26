import * as Dotenv from 'dotenv';
import * as path from 'path';
Dotenv.config({ path: '../../.env' });

import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || 5432,
      database: process.env.POSTGRES_DB || 'food_delivery',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '',
    },
    migrations: {
      extension: 'ts',
      tableName: 'migrations',
      directory: path.join(__dirname, 'migrations'),
      timezone: 'UTC',
    },
    ...knexSnakeCaseMappers(),
  },
  staging: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
    ...knexSnakeCaseMappers(),
  },
  production: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
    ...knexSnakeCaseMappers(),
  },
}[process.env.NODE_ENV || 'development'];
