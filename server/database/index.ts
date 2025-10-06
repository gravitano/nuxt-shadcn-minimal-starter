import { Pool } from 'pg';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const globalForDb = globalThis as unknown as {
  drizzleDb?: NodePgDatabase<typeof schema>;
  drizzlePool?: Pool;
};

let dbInstance = globalForDb.drizzleDb;

if (!dbInstance) {
  const connectionString = process.env.DATABASE_URL;

  if (connectionString) {
    const pool = new Pool({ connectionString });
    dbInstance = drizzle(pool, { schema });
    globalForDb.drizzleDb = dbInstance;
    globalForDb.drizzlePool = pool;
  } else {
    console.warn('DATABASE_URL is not set. Database access will be unavailable.');
  }
}

export type Database = NodePgDatabase<typeof schema>;

export { schema };

export function useDb(): NodePgDatabase<typeof schema> {
  if (!dbInstance) {
    throw new Error('Database connection is not configured. Set DATABASE_URL to use Drizzle.');
  }

  return dbInstance;
}
