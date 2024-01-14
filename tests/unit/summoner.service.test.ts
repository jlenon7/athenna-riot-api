import { Summoner } from '#src/database/models/summoner'
import { Database, DatabaseProvider } from '@athenna/database'
import { REGION, NICKNAME } from '#tests/fixtures/constants/summoner'
import { SummonerService } from '#src/providers/services/summoner.service'
import { Test, type Context, BeforeEach, AfterEach, Mock } from '@athenna/test'
import { FakeRiotApiService } from '#tests/fixtures/services/fakeriotapi.service'

export default class SummonerServiceTest {
  @BeforeEach()
  public async beforeEach() {
    Config.set('database.default', 'fake')
    Config.set('database.connections.fake.driver', 'fake')

    /**
     * Register database provider in case developer
     * is running only the SummonerServiceTest.
     */
    new DatabaseProvider().register()
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
      region: REGION,
      nickname: NICKNAME
    })

    Mock.when(Database.driver, 'findMany').resolve([fakeSummoner])

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoners = await summonerService.findAll(REGION)

    assert.containsSubset(summoners, [{ nickname: 'iLenon7', region: 'br1' }])
  }

  @Test()
  public async shouldBeAbleCreateOneSummoner({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: REGION,
      nickname: NICKNAME
    })

    Mock.when(Database.driver, 'find').resolve(undefined)
    Mock.when(Database.driver, 'createMany').resolve([fakeSummoner])

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.createOne(REGION, NICKNAME)

    assert.containsSubset(summoner, { region: REGION, nickname: NICKNAME })
  }

  @Test()
  public async shouldBeAbleToGetASummonerByRegionAndNickname({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: REGION,
      nickname: NICKNAME
    })

    Mock.when(Database.driver, 'find').resolve(fakeSummoner)

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.findOne(REGION, NICKNAME)

    assert.containsSubset(summoner, { region: REGION, nickname: NICKNAME })
  }

  @Test()
  public async shouldBeAbleToUpdateASummonerByRegionAndNickname({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: REGION,
      nickname: NICKNAME
    })

    Mock.when(Database.driver, 'find').resolve(fakeSummoner)
    Mock.when(Database.driver, 'update').resolve(fakeSummoner)

    const summonerService = new SummonerService(new FakeRiotApiService())
    const summoner = await summonerService.updateOne(REGION, NICKNAME)

    assert.containsSubset(summoner, { region: REGION, nickname: NICKNAME })
  }

  @Test()
  public async shouldBeAbleToDeleteASummonerByRegionAndNickname({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make({
      region: REGION,
      nickname: NICKNAME
    })

    Mock.when(Database.driver, 'find').resolve(fakeSummoner)
    Mock.when(Database.driver, 'update').resolve(undefined)

    const summonerService = new SummonerService(new FakeRiotApiService())
    await summonerService.deleteOne(REGION, NICKNAME)

    assert.calledWithMatch(Database.driver.update, { deletedAt: Mock.match.date })
  }
}
