import { Service } from '@athenna/ioc'
import { Summoner } from '#src/models/summoner'
import type { RiotApiServiceInterface } from '#src/interfaces/riotapi.service.interface'

@Service()
export class SummonerService {
  public constructor(private riotApiService: RiotApiServiceInterface) {}

  public async findAll(region: string) {
    const summoners = await Summoner.query().where('region', region).findMany()

    return summoners.map(summoner => summoner.toJSON())
  }

  public async findOne(region: string, nickname: string) {
    const summoner = await Summoner.query()
      .where('region', region)
      .where('nickname', nickname)
      .findOrFail()

    return summoner.toJSON()
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
