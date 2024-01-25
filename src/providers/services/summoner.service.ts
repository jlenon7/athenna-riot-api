import { Inject, Service } from '@athenna/ioc'
import { Summoner } from '#src/database/models/summoner'
import { Options, type PaginationOptions } from '@athenna/common'
import type { RankService } from '#src/providers/services/rank.service'
import type { RiotApiServiceInterface } from '#src/providers/interfaces/riotapi.service.interface'

@Service()
export class SummonerService {
  @Inject()
  private rankService: RankService

  @Inject()
  private riotApiService: RiotApiServiceInterface

  public async paginate(region: string, options: PaginationOptions = {}) {
    options = Options.create(options, {
      page: 0,
      limit: 10
    })

    return Summoner.query()
      .where('region', region)
      .paginate(options.page, options.limit, options.resourceUrl)
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

    await this.rankService.create(summoner)
    await summoner.load('ranks')

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
