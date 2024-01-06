import { Service } from '@athenna/ioc'
import { Config } from '@athenna/config'
import type { SummonerDto } from '#src/dtos/summoner.dto'
import { HttpClient, HttpClientBuilder } from '@athenna/common'
import { ApiKeyExpiredException } from '#src/exceptions/apikeyexpired.exception'

@Service()
export class RiotApiService {
  public request(region: string): HttpClientBuilder {
    return HttpClient.builder()
      .prefixUrl(Config.get('riot.baseUrl').replace('{{ region }}', region))
      .throwHttpErrors(false)
      .responseType('json')
      .queryParams({ api_key: Config.get('riot.apiKey') })
  }

  public async getSummoner(region: string, nick: string): Promise<SummonerDto> {
    const response = await this.request(region)
      .url(`/lol/summoner/v4/summoners/by-name/${nick}`)
      .get()

    if (response.statusCode === 403) {
      throw new ApiKeyExpiredException()
    }

    return response.body
  }
}
