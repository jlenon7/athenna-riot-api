import { Inject, Service } from '@athenna/ioc'
import { Rank } from '#src/database/models/rank'
import type { Summoner } from '#src/database/models/summoner'
import type { RiotApiService } from '#src/providers/services/riotapi.service'
import { Is } from '@athenna/common'

@Service()
export class RankService {
  @Inject()
  private riotApiService: RiotApiService

  public async create(summoner: Summoner) {
    const ranksDto = await this.riotApiService.getRanksBySummonerId(
      summoner.region,
      summoner.summonerId
    )

    if (Is.Empty(ranksDto)) {
      return []
    }

    const ranksToCreate = ranksDto.map(dto => {
      dto.summonerId = summoner.id
      return dto
    })

    return Rank.createMany(ranksToCreate)
  }
}
