import { Service } from '@athenna/ioc'
import { Summoner } from '#src/models/summoner'
import type { RiotApiServiceInterface } from '#src/interfaces/riotapi.service.interface'

@Service()
export class SummonerService {
  public constructor(private riotApiService: RiotApiServiceInterface) {}

  public async findAll(region: string) {
    const summoners = await Summoner.query()
      .where('region', region)
      .collection()

    return summoners.toJSON()
  }

  public async findOne(region: string, nickname: string) {
    const summoner = await Summoner.query()
      .where('region', region)
      .where('nickname', nickname)
      .findOrFail()

    return summoner.toJSON()
  }

  public async createOne(region: string, nickname: string) {
    const data = await this.riotApiService.getSummonerByName(region, nickname)
    const summoner = await Summoner.create({
      region,
      puuid: data.puuid,
      summonerId: data.id,
      nickname: data.name,
      accountId: data.accountId
    })

    return summoner.toJSON()
  }

  public async updateOne(region: string, nickname: string) {
    const summoner = await Summoner.query()
      .where('region', region)
      .where('nickname', nickname)
      .findOrFail()

    const data = await this.riotApiService.getSummonerBySummonerId(
      summoner.region,
      summoner.summonerId
    )

    summoner.puuid = data.puuid
    summoner.summonerId = data.id
    summoner.nickname = data.name
    summoner.accountId = data.accountId

    await summoner.save()

    return summoner.toJSON()
  }

  public async deleteOne(region: string, nickname: string) {
    const summoner = await Summoner.query()
      .where('region', region)
      .where('nickname', nickname)
      .findOrFail()

    await summoner.delete()
  }
}
