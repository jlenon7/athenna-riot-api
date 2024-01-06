import { Service } from '@athenna/ioc'
import { Summoner } from '#src/models/summoner'
import type { RiotApiService } from '#src/services/riotapi.service'

@Service()
export class SummonerService {
  public constructor(private riotApiService: RiotApiService) {}

  public async findAll(region: string) {
    const summoners = await Summoner.query().where('region', region).findMany()

    return summoners.map(summoner => summoner.toJSON())
  }

  public async createOne(region: string, nickname: string) {
    const data = await this.riotApiService.getSummoner(region, nickname)
    const summoner = await Summoner.create({
      region,
      puuid: data.puuid,
      nickname: data.name,
      accountId: data.accountId
    })

    return summoner.toJSON()
  }
}
