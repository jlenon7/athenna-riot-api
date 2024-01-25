import { Rank } from '#src/database/models/rank'
import { Summoner } from '#src/database/models/summoner'
import { Database, DatabaseProvider } from '@athenna/database'
import { RankService } from '#src/providers/services/rank.service'
import { Test, type Context, BeforeEach, AfterEach, Mock } from '@athenna/test'
import { FakeRiotApiService } from '#tests/fixtures/services/fakeriotapi.service'

export default class RankServiceTest {
  @BeforeEach()
  public async beforeEach() {
    Config.set('database.default', 'fake')
    Config.set('database.connections.fake.driver', 'fake')

    await ioc.loadModule('#tests/fixtures/services/fakeriotapi.service')

    /**
     * Register database provider in case developer
     * is running only the RankServiceTest.
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
  public async shouldBeAbleToCreateRanks({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make()
    const fakeRank = await Rank.factory().count(1).make({ summonerId: fakeSummoner.id })

    Mock.when(Database.driver, 'createMany').resolve([fakeRank])

    const rankService = new RankService()
    const ranks = await rankService.create(fakeSummoner)

    assert.containsSubset(ranks, [{ summonerId: fakeSummoner.id }])
  }

  @Test()
  public async shouldNotCreateAnyRankIfSummonerDontHaveAny({ assert }: Context) {
    const fakeSummoner = await Summoner.factory().count(1).make()

    Mock.when(FakeRiotApiService.prototype, 'getRanksBySummonerId').resolve([])

    const rankService = new RankService()
    const ranks = await rankService.create(fakeSummoner)

    assert.isEmpty(ranks)
  }
}
