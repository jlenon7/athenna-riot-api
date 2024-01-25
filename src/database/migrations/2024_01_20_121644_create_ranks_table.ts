import { BaseMigration, type DatabaseImpl } from '@athenna/database'

export class RankMigration extends BaseMigration {
  public tableName = 'ranks'

  public async up(db: DatabaseImpl) {
    return db.createTable(this.tableName, builder => {
      builder.uuid('id').primary().defaultTo(db.raw('uuid_generate_v4()'))
      builder.uuid('summonerId').references('id').inTable('summoners')
      builder.string('leagueId')
      builder.string('tier')
      builder.string('rank')
      builder.integer('pdl')
      builder.string('queueType')
      builder.integer('leaguePoints')
      builder.string('winrate')
      builder.integer('wins')
      builder.integer('losses')
      builder.boolean('inactive')
      builder.boolean('veteran')
      builder.boolean('hotStreak')
      builder.boolean('freshBlood')
      builder.string('season')
      builder.dateTime('deletedAt').defaultTo(null)
      builder.timestamps(true, true, true)
    })
  }

  public async down(db: DatabaseImpl) {
    return db.dropTable(this.tableName)
  }
}
