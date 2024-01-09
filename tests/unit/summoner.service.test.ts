import { Summoner } from '#src/models/summoner'
import { Database, DatabaseProvider } from '@athenna/database'
import { SummonerService } from '#src/services/summoner.service'
import { FakeRiotApiService } from '#tests/fixtures/fakeriotapi.service'
import { Test, type Context, BeforeEach, AfterEach, Mock } from '@athenna/test'

export default class SummonerServiceTest {
  private readonly REGION = 'br1'
  private readonly NICKNAME = 'iLenon7'

  @BeforeEach()
  public async beforeEach() {
    Config.set('database.default', 'fake')
    Config.set('database.connections.fake.driver', 'fake')

    new DatabaseProvider().register()
    Mock.when(Summoner, 'connection').return('fake')
  }

  @AfterEach()
  public async afterEach() {
    Config.clear()
    ioc.reconstruct()
    Mock.restoreAll()
  }

  @Test()
  public async shouldBeAbleToListAllSummonersByRegion({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: this.REGION,
      nickname: this.NICKNAME
    })

    Mock.when(Database.driver, 'findMany').resolve([fakeSummoner])

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoners = await summonerService.findAll(this.REGION)

    assert.containsSubset(summoners, [{ nickname: 'iLenon7', region: 'br1' }])
  }

  @Test()
  public async shouldBeAbleCreateOneSummoner({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: this.REGION,
      nickname: this.NICKNAME
    })

    Mock.when(Database.driver, 'find').resolve(undefined)
    Mock.when(Database.driver, 'createMany').resolve([fakeSummoner])

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.createOne(this.REGION, this.NICKNAME)

    assert.containsSubset(summoner, { region: this.REGION, nickname: this.NICKNAME })
  }

  @Test()
  public async shouldBeAbleToGetASummonerByRegionAndNickname({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: this.REGION,
      nickname: this.NICKNAME
    })

    Mock.when(Database.driver, 'find').resolve(fakeSummoner)

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.findOne(this.REGION, this.NICKNAME)

    assert.containsSubset(summoner, { region: this.REGION, nickname: this.NICKNAME })
  }

  @Test()
  public async shouldBeAbleToUpdateASummonerByRegionAndNickname({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: this.REGION,
      nickname: this.NICKNAME
    })

    Mock.when(Database.driver, 'find').resolve(fakeSummoner)
    Mock.when(Database.driver, 'update').resolve(fakeSummoner)

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.updateOne(this.REGION, this.NICKNAME)

    assert.containsSubset(summoner, { region: this.REGION, nickname: this.NICKNAME })
  }
}
