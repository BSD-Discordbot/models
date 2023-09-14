import { sql, type Kysely } from 'kysely'

export async function up (db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('player')
    .addColumn('discord_id', 'bigint', (col) => col.unique().primaryKey())
    .addColumn('balance', 'integer', (col) => col.defaultTo(0).notNull())
    .addColumn('last_daily', 'timestamp', (col) =>
      col.defaultTo(new Date(0)).notNull()
    )
    .addColumn('daily_streak', 'integer', (col) => col.defaultTo(0).notNull())
    .execute()

  await db.schema
    .createTable('card')
    .addColumn('id', 'integer', (col) => col.unique().primaryKey())
    .addColumn('rarity', 'integer', (col) => col.defaultTo(1).notNull())
    .execute()

  await db.schema
    .createTable('card_upgrade')
    .addColumn('id', 'integer', (col) =>
      col.unique().primaryKey().references('card.id').onDelete('cascade')
    )
    .addColumn('requirement', 'integer', (col) =>
      col.references('card.id').onDelete('cascade')
    )
    .execute()

  await db.schema
    .createTable('event')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('start_time', 'timestamp')
    .addColumn('end_time', 'timestamp')
    .addColumn('name', 'varchar')
    .addColumn('default', 'boolean', (col) => col.defaultTo(false).notNull())
    .execute()

  await db.schema
    .createTable('player_has_card')
    .addColumn('discord_id', 'bigint', (col) =>
      col.references('player.discord_id').onDelete('cascade')
    )
    .addColumn('card', 'integer', (col) =>
      col.references('card.id').onDelete('cascade')
    )
    .addColumn('amount', 'integer', (col) => col.defaultTo(1).notNull())
    .addColumn('date_owned', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_DATE`).notNull()
    )
    .addPrimaryKeyConstraint('player_has_card_pkey', ['discord_id', 'card'])
    .execute()

  await db.schema
    .createTable('event_has_card')
    .addColumn('event', 'integer', (col) =>
      col.references('event.id').onDelete('cascade')
    )
    .addColumn('card', 'integer', (col) =>
      col.references('card.id').onDelete('cascade')
    )
    .addPrimaryKeyConstraint('event_has_card_pkey', ['event', 'card'])
    .execute()
}

export async function down (db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('player_has_card').execute()
  await db.schema.dropTable('event_has_card').execute()
  await db.schema.dropTable('card_upgrade').execute()
  await db.schema.dropTable('card').execute()
  await db.schema.dropTable('event').execute()
  await db.schema.dropTable('player').execute()
}
