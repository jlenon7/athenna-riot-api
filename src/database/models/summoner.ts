import { Rank } from '#src/database/models/rank'
import { Column, BaseModel, HasMany } from '@athenna/database'

export class Summoner extends BaseModel {
  @Column()
  public id: string

  @Column({ isNullable: false })
  public nickname: string

  @Column({ isUnique: true, isNullable: false })
  public summonerId: string

  @Column({ isUnique: true, isNullable: false })
  public accountId: string

  @Column({ isUnique: true, isNullable: false })
  public puuid: string

  @Column()
  public region: string

  @Column({ isCreateDate: true })
  public createdAt: Date

  @Column({ isUpdateDate: true })
  public updatedAt: Date

  @Column({ isDeleteDate: true })
  public deletedAt: Date

  @HasMany(() => Rank)
  public ranks: Rank[]

  public static async definition() {
    return {
      id: this.faker.string.uuid(),
      nickname: this.faker.person.firstName(),
      summonerId: this.faker.string.uuid(),
      accountId: this.faker.string.uuid(),
      puuid: this.faker.string.uuid(),
      region: 'br1',
      createdAt: this.faker.date.anytime(),
      updatedAt: this.faker.date.anytime(),
      deletedAt: null
    }
  }
}
