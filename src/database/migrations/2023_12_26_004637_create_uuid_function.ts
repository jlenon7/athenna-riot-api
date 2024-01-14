import { DatabaseImpl, BaseMigration } from '@athenna/database'

export class UuidFunctionMigration extends BaseMigration {
  public async up(db: DatabaseImpl) {
    return db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  }

  public async down(db: DatabaseImpl) {
    return db.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
