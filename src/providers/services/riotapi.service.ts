import { Service } from '@athenna/ioc'
import { Config } from '@athenna/config'
import { RankDto } from '#src/dtos/rank.dto'
import { SummonerDto } from '#src/dtos/summoner.dto'
import { HttpClient, HttpClientBuilder } from '@athenna/common'
import { ApiKeyExpiredException } from '#src/exceptions/apikeyexpired.exception'
import type { RiotApiServiceInterface } from '#src/providers/interfaces/riotapi.service.interface'

@Service()
export class RiotApiService implements RiotApiServiceInterface {
  public request(region: string): HttpClientBuilder {
    return HttpClient.builder()
      .prefixUrl(Config.get('riot.baseUrl').replace('{{ region }}', region))
      .throwHttpErrors(false)
      .responseType('json')
      .queryParams({ api_key: Config.get('riot.apiKey') })
  }

  public async getSummonerByName(region: string, nick: string) {
    const response = await this.request(region)
      .url(`/lol/summoner/v4/summoners/by-name/${nick}`)
      .get<SummonerDto>()

    if (response.statusCode === 403) {
      throw new ApiKeyExpiredException()
    }

    return response.body
  }

  public async getSummonerBySummonerId(region: string, summonerId: string) {
    const response = await this.request(region)
      .url(`/lol/summoner/v4/summoners/${summonerId}`)
      .get<SummonerDto>()

    if (response.statusCode === 403) {
      throw new ApiKeyExpiredException()
    }

    return response.body
  }

  public async getRanksBySummonerId(region: string, summonerId: string) {
    const response = await this.request(region)
      .url(`lol/league/v4/entries/by-summoner/${summonerId}`)
      .get<RankDto[]>()

    if (response.statusCode === 403) {
      throw new ApiKeyExpiredException()
    }

    return response.body
  }
}
