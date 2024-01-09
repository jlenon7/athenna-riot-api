import { HttpClient } from '@athenna/common'
import { RiotApiService } from '#src/services/riotapi.service'
import { Test, type Context, AfterEach, Mock, BeforeEach } from '@athenna/test'
import { ApiKeyExpiredException } from '#src/exceptions/apikeyexpired.exception'

export default class RiotApiServiceTest {
  private readonly REGION = 'br1'
  private readonly NICKNAME = 'iLenon7'
  private readonly SUMMONER_ID = 'q7kJ4LOHcfyzVsBLSlgPo1K6_zAIH3HLsMRTpVtxOzLFPZ8'

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

    Mock.when(builder, 'get').resolve({ body: { region: this.REGION, name: this.NICKNAME } })
    Mock.when(riotApiService, 'request').return(builder)

    const summoner = await riotApiService.getSummonerByName(this.REGION, this.NICKNAME)

    assert.deepEqual(summoner, {
      region: this.REGION,
      name: this.NICKNAME
    })
  }

  @Test()
  public async shouldThrowApiKeyExpiredExceptionInGetSummonerByName({ assert }: Context) {
    const riotApiService = new RiotApiService()
    const builder = HttpClient.builder()

    Mock.when(builder, 'get').resolve({ statusCode: 403 })
    Mock.when(riotApiService, 'request').return(builder)

    await assert.rejects(() => riotApiService.getSummonerByName(this.REGION, this.NICKNAME), ApiKeyExpiredException)
  }

  @Test()
  public async shouldBeAbleToGetSummonerBySummonerIdInRiotApi({ assert }: Context) {
    const riotApiService = new RiotApiService()
    const builder = HttpClient.builder()

    Mock.when(builder, 'get').resolve({ body: { region: this.REGION, name: this.NICKNAME } })
    Mock.when(riotApiService, 'request').return(builder)

    const summoner = await riotApiService.getSummonerBySummonerId(this.REGION, this.SUMMONER_ID)

    assert.deepEqual(summoner, {
      region: this.REGION,
      name: this.NICKNAME
    })
  }

  @Test()
  public async shouldThrowApiKeyExpiredExceptionInGetSummonerBySummonerId({ assert }: Context) {
    const riotApiService = new RiotApiService()
    const builder = HttpClient.builder()

    Mock.when(builder, 'get').resolve({ statusCode: 403 })
    Mock.when(riotApiService, 'request').return(builder)

    await assert.rejects(
      () => riotApiService.getSummonerBySummonerId(this.REGION, this.NICKNAME),
      ApiKeyExpiredException
    )
  }
}
