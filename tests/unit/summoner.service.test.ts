import { FakeDriver } from '@athenna/database'
import { Summoner } from '#src/models/summoner'
import { SummonerService } from '#src/services/summoner.service'
import { FakeRiotApiService } from '#tests/fixtures/fakeriotapi.service'
import { Test, type Context, BeforeEach, AfterEach, Mock } from '@athenna/test'

export default class SummonerServiceTest {
  private readonly REGION = 'br1'
  private readonly NICKNAME = 'iLenon7'

  @BeforeEach()
  public async beforeEach() {
    Mock.when(FakeDriver, 'find').return(undefined)
    Mock.when(Summoner, 'connection').return('fake')
  }

  @AfterEach()
  public async afterEach() {
    Mock.restoreAll()
  }

  @Test()
  public async shouldBeAbleToListAllSummonersByRegion({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: this.REGION,
      nickname: this.NICKNAME
    })

    Mock.when(FakeDriver, 'createMany').resolve([fakeSummoner])

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.createOne(this.REGION, this.NICKNAME)

    assert.containsSubset(summoner, { region: this.REGION, nickname: this.NICKNAME })
  }

  // @Test()
  // public async shouldBeAbleToCreateASummonerFromRiotApi({ assert }: Context) {
  //   const region = 'br1'
  //   const fakeSummoner = Summoner.factory().make({})
  //   Mock.when(FakeDriver, 'createMany').resolve()
  //
  //   const summonerService = new SummonerService(new FakeRiotApiService())
  //   const summoner = await summonerService.createOne('br1', 'iLenon7')
  //
  //   assert.deepEqual(summoner, { id: '1' })
  // }
}
