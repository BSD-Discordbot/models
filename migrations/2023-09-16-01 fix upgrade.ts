import { type Kysely } from 'kysely'

export async function up (db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('card_upgrade').ifExists().execute()
  await db.schema
    .createTable('card_upgrade')
    .addColumn('card', 'integer', (col) =>
      col.references('card.id').onDelete('cascade')
    )
    .addColumn('requirement', 'integer', (col) =>
      col.references('card.id').onDelete('cascade')
    )
    .addColumn('amount', 'integer', (col) => col.notNull().defaultTo(1))
    .addPrimaryKeyConstraint('card_upgrade_pkey', ['card', 'requirement'])
    .execute()
}

export async function down (db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('card_upgrade').ifExists().execute()
  await db.schema
    .createTable('card_upgrade')
    .addColumn('card', 'integer', (col) =>
      col.references('card.id').onDelete('cascade')
    )
    .addColumn('requirement', 'integer', (col) =>
      col.references('card.id').onDelete('cascade')
    )
    .addColumn('amount', 'integer', (col) => col.notNull().defaultTo(1))
    .addPrimaryKeyConstraint('card_upgrade_pkey', ['card', 'requirement'])
    .execute()
}
