import type { SummonerDto } from '#src/dtos/summoner.dto'

export interface RiotApiServiceInterface {
  getSummoner(region: string, nick: string): Promise<SummonerDto>
}
