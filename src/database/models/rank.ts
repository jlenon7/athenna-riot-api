import { Summoner } from '#src/database/models/summoner'
import { Column, BaseModel, BelongsTo, type Relation } from '@athenna/database'

export class Rank extends BaseModel {
  @Column()
  public id: string

  @Column()
  public summonerId: string

  @Column()
  public leagueId: string

  @Column()
  public tier: string

  @Column()
  public rank: string

  @Column()
  public pdl: number

  @Column()
  public queueType: string

  @Column()
  public winrate: string

  @Column()
  public leaguePoints: number

  @Column()
  public wins: number

  @Column()
  public losses: number

  @Column()
  public inactive: boolean

  @Column()
  public veteran: boolean

  @Column()
  public hotStreak: boolean

  @Column()
  public freshBlood: boolean

  @Column()
  public season: string

  @Column({ isCreateDate: true })
  public createdAt: Date

  @Column({ isUpdateDate: true })
  public updatedAt: Date

  @Column({ isDeleteDate: true })
  public deletedAt: Date

  @BelongsTo(() => Summoner)
  public summoner: Relation<Summoner>

  public static async definition() {
    return {
      id: this.faker.string.uuid(),
      summonerId: Summoner.factory().returningAs('id'),
      leagueId: this.faker.string.uuid(),
      tier: '',
      rank: '',
      pdl: this.faker.number.int({ max: 100 }),
      queueType: 'flex',
      winrate: '98%',
      leaguePoints: this.faker.number.int({ max: 100 }),
      wins: 0,
      losses: 0,
      inactive: false,
      veteran: false,
      hotStreak: false,
      freshBlood: false,
      season: '2024',
      createdAt: this.faker.date.anytime(),
      updatedAt: this.faker.date.anytime(),
      deletedAt: null
    }
  }
}
