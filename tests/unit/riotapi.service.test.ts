import { HttpClient } from '@athenna/common'
import { RiotApiService } from '#src/services/riotapi.service'
import { Test, type Context, AfterEach, Mock, BeforeEach } from '@athenna/test'
import { ApiKeyExpiredException } from '#src/exceptions/apikeyexpired.exception'
import { REGION, NICKNAME, SUMMONER_ID } from '#tests/fixtures/constants/summoner'

export default class RiotApiServiceTest {
  @BeforeEach()
  public async beforeEach() {
    Config.set('riot.apiKey', '12345')
    Config.set('riot.baseUrl', 'https://{{ region }}.api.com')
  }

  @AfterEach()
  public async afterEach() {
    Mock.restoreAll()
  }

  @Test()
  public async shouldBeAbleToGetSummonerByNameInRiotApi({ assert }: Context) {
    const riotApiService = new RiotApiService()
    const builder = HttpClient.builder()

    Mock.when(builder, 'get').resolve({ body: { region: REGION, name: NICKNAME } })
    Mock.when(riotApiService, 'request').return(builder)

    const summoner = await riotApiService.getSummonerByName(REGION, NICKNAME)

    assert.deepEqual(summoner, {
      region: REGION,
      name: NICKNAME
    })
  }

  @Test()
  public async shouldThrowApiKeyExpiredExceptionInGetSummonerByName({ assert }: Context) {
    const riotApiService = new RiotApiService()
    const builder = HttpClient.builder()

    Mock.when(builder, 'get').resolve({ statusCode: 403 })
    Mock.when(riotApiService, 'request').return(builder)

    await assert.rejects(() => riotApiService.getSummonerByName(REGION, NICKNAME), ApiKeyExpiredException)
  }

  @Test()
  public async shouldBeAbleToGetSummonerBySummonerIdInRiotApi({ assert }: Context) {
    const riotApiService = new RiotApiService()
    const builder = HttpClient.builder()

    Mock.when(builder, 'get').resolve({ body: { region: REGION, name: NICKNAME } })
    Mock.when(riotApiService, 'request').return(builder)

    const summoner = await riotApiService.getSummonerBySummonerId(REGION, SUMMONER_ID)

    assert.deepEqual(summoner, {
      region: REGION,
      name: NICKNAME
    })
  }

  @Test()
  public async shouldThrowApiKeyExpiredExceptionInGetSummonerBySummonerId({ assert }: Context) {
    const riotApiService = new RiotApiService()
    const builder = HttpClient.builder()

    Mock.when(builder, 'get').resolve({ statusCode: 403 })
    Mock.when(riotApiService, 'request').return(builder)

    await assert.rejects(() => riotApiService.getSummonerBySummonerId(REGION, NICKNAME), ApiKeyExpiredException)
  }
}
