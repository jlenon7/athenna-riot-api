import { Service } from '@athenna/ioc'
import { Rank } from '#src/database/models/rank'
import { Summoner } from '#src/database/models/summoner'

@Service({ type: 'singleton', camelAlias: 'rankService' })
export class FakeRankService {
  public async create(summoner: Summoner): Promise<Rank[]> {
    return Rank.factory().count(2).make({ summonerId: summoner.id })
  }
}
