import { Service } from '@athenna/ioc'
import { RankDto } from '#src/dtos/rank.dto'
import { Rank } from '#src/database/models/rank'
import { SummonerDto } from '#src/dtos/summoner.dto'
import { Summoner } from '#src/database/models/summoner'
import { NICKNAME, SUMMONER_ID } from '#tests/fixtures/constants/summoner'
import type { RiotApiServiceInterface } from '#src/providers/interfaces/riotapi.service.interface'

@Service({ type: 'singleton', camelAlias: 'riotApiService' })
export class FakeRiotApiService implements RiotApiServiceInterface {
  public async getSummonerByName(): Promise<SummonerDto> {
    const summoner = await Summoner.factory().count(1).make()

    return {
      id: summoner.summonerId,
      name: summoner.nickname,
      puuid: summoner.puuid,
      accountId: summoner.accountId,
      summonerLevel: 1,
      profileIconId: 1,
      revisionDate: Date.now()
    }
  }

  public async getSummonerBySummonerId(): Promise<SummonerDto> {
    const summoner = await Summoner.factory().count(1).make()

    return {
      id: summoner.summonerId,
      name: summoner.nickname,
      puuid: summoner.puuid,
      accountId: summoner.accountId,
      summonerLevel: 1,
      profileIconId: 1,
      revisionDate: Date.now()
    }
  }

  public async getRanksBySummonerId(): Promise<RankDto[]> {
    const rank = await Rank.factory().count(1).make()

    return [
      {
        leagueId: rank.leagueId,
        summonerId: SUMMONER_ID,
        summonerName: NICKNAME,
        queueType: rank.queueType,
        tier: rank.tier,
        rank: rank.rank,
        leaguePoints: rank.leaguePoints,
        wins: rank.wins,
        losses: rank.losses,
        hotStreak: rank.hotStreak,
        veteran: rank.veteran,
        freshBlood: rank.freshBlood,
        inactive: rank.inactive,
        miniSeries: [{ wins: 0, losses: 0, target: 0, progress: '' }]
      }
    ]
  }
}
