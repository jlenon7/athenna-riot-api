import { BaseMigration, type DatabaseImpl } from '@athenna/database'

export class SummonerMigration extends BaseMigration {
  public tableName = 'summoners'

  public async up(db: DatabaseImpl) {
    return db.createTable(this.tableName, builder => {
      builder.uuid('id').primary().defaultTo(db.raw('uuid_generate_v4()'))
      builder.string('nickname')
      builder.string('region')
      builder.string('puuid').unique()
      builder.string('summonerId').unique()
      builder.string('accountId').unique()
      builder.dateTime('deletedAt').defaultTo(null)
      builder.timestamps(true, true, true)
    })
  }

  public async down(db: DatabaseImpl) {
    return db.dropTable(this.tableName)
  }
}
