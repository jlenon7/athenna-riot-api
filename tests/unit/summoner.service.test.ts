import { Summoner } from '#src/models/summoner'
import { SummonerService } from '#src/services/summoner.service'
import { DatabaseProvider, FakeDriver } from '@athenna/database'
import { FakeRiotApiService } from '#tests/fixtures/fakeriotapi.service'
import { Test, type Context, BeforeEach, AfterEach, Mock } from '@athenna/test'

export default class SummonerServiceTest {
  private readonly REGION = 'br1'
  private readonly NICKNAME = 'iLenon7'

  @BeforeEach()
  public async beforeEach() {
    new DatabaseProvider().register()
    Mock.when(Summoner, 'connection').return('fake')
  }

  @AfterEach()
  public async afterEach() {
    ioc.reconstruct()
    Mock.restoreAll()
  }

  @Test()
  public async shouldBeAbleToListAllSummonersByRegion({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: this.REGION,
      nickname: this.NICKNAME
    })

    Mock.when(FakeDriver, 'findMany').resolve([fakeSummoner])

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoners = await summonerService.findAll(this.REGION)

    assert.containsSubset(summoners, [{ nickname: 'iLenon7', region: 'br1' }])
  }

  @Test()
  public async shouldBeAbleToGetASummonerByRegionAndNickname({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: this.REGION,
      nickname: this.NICKNAME
    })

    Mock.when(FakeDriver, 'find').resolve(fakeSummoner)

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.findOne(this.REGION, this.NICKNAME)

    assert.containsSubset(summoner, { region: this.REGION, nickname: this.NICKNAME })
  }

  @Test()
  public async shouldBeAbleCreateOneSummoner({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: this.REGION,
      nickname: this.NICKNAME
    })

    Mock.when(FakeDriver, 'find').resolve(undefined)
    Mock.when(FakeDriver, 'createMany').resolve([fakeSummoner])

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.createOne(this.REGION, this.NICKNAME)

    assert.containsSubset(summoner, { region: this.REGION, nickname: this.NICKNAME })
  }
}
