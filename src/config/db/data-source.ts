import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const connectionOptions = parse(databaseUrl);

// Validate required properties
if (!connectionOptions.database) {
  throw new Error('Invalid DATABASE_URL: Missing database name');
}
if (!connectionOptions.host) {
  throw new Error('Invalid DATABASE_URL: Missing host');
}
if (!connectionOptions.user) {
  throw new Error('Invalid DATABASE_URL: Missing username');
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres', // Use PostgreSQL
  host: connectionOptions.host,
  port: parseInt(connectionOptions.port || '5432', 10),
  username: connectionOptions.user,
  password: connectionOptions.password || undefined, // Handle optional password
  database: connectionOptions.database,
  entities: ['dist/**/**.dao{.ts,.js}'],
  migrations: ['dist/**/**.migration{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false, // Required for Supabase
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
