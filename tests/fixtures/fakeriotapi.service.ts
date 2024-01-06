import { Summoner } from '#src/models/summoner'
import { SummonerDto } from '#src/dtos/summoner.dto'

export class FakeRiotApiService {
  public async getSummoner(): Promise<SummonerDto> {
    const summoner = await Summoner.factory().count(1).make()

    return {
      name: summoner.nickname,
      puuid: summoner.puuid,
      accountId: summoner.accountId,
      summonerLevel: 1,
      profileIconId: 1,
      revisionDate: Date.now()
    }
  }
}
