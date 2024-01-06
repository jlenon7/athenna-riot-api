import { RiotApiService } from '#src/services/riotapi.service'
import { HttpClient } from '@athenna/common'
import { Test, type Context, AfterEach, Mock, BeforeEach } from '@athenna/test'

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
  public async shouldBeAbleToGetSummonerInRiotApi({ assert }: Context) {
    const region = 'br1'
    const name = 'iLenon7'
    const riotApiService = new RiotApiService()
    const builder = HttpClient.builder()

    Mock.when(builder, 'get').resolve({ body: { region, name } })
    Mock.when(riotApiService, 'request').return(builder)

    const summoner = await riotApiService.getSummoner(region, name)

    assert.deepEqual(summoner, {
      region,
      name
    })
  }
}
