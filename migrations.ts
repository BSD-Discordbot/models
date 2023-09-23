import { promises as fs } from "fs";
import {
  Kysely,
  Migration,
  Migrator,
  PostgresDialect,
} from "kysely";
import * as path from "path";
import pg from "pg";
import type Database from "./model";

async function migrateToLatest(): Promise<void> {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
      }),
    }),
  });

  // console.log(require('~/'))
  const migrator = new Migrator({
    db,
    provider: {
      async getMigrations(): Promise<Record<string, Migration>> {
        return {
          '2023-09-23-01 create tables': await import("./migrations/2023-09-23-01 create tables")
        };
      },
    },
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.log(error);
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

export default migrateToLatest;
