import type { SummonerDto } from '#src/dtos/summoner.dto'

export interface RiotApiServiceInterface {
  getSummonerByName(region: string, nick: string): Promise<SummonerDto>
  getSummonerBySummonerId(
    region: string,
    summonerId: string
  ): Promise<SummonerDto>
}
