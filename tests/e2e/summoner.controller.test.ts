import { Database } from '@athenna/database'
import { Summoner } from '#src/models/summoner'
import { BaseHttpTest } from '@athenna/core/testing/BaseHttpTest'
import { Test, type Context, BeforeEach, AfterEach } from '@athenna/test'

export default class SummonerControllerTest extends BaseHttpTest {
  @BeforeEach()
  public async beforeEach() {
    await Summoner.factory().count(10).create()
  }

  @AfterEach()
  public async afterEach() {
    await Summoner.truncate()
    await Database.close()
  }

  @Test()
  public async shouldBeAbleToGetAllSummonersByRegionFromApi({ request }: Context) {
    const response = await request.get('/api/v1/summoners/br1')

    response.assertStatusCode(200)
    response.assertBodyIsArray()
  }

  @Test()
  public async shouldBeAbleToGetASummonerByRegionAndItNicknameFromApi({ request }: Context) {
    await Summoner.factory().create({ nickname: 'iLenon7' })

    const response = await request.get('/api/v1/summoners/br1/iLenon7')

    response.assertStatusCode(200)
    response.assertBodyContains({
      region: 'br1',
      nickname: 'iLenon7'
    })
  }

  @Test()
  public async shouldThrowNotFoundExceptionWhenSummonerDoesNotExist({ request }: Context) {
    const response = await request.get('/api/v1/summoners/br1/iLenon7')

    response.assertStatusCode(404)
    response.assertBodyContains({
      name: 'NotFoundDataException',
      code: 'E_NOT_FOUND_DATA_ERROR',
      message: 'Data not found in database.',
      help: 'Data not found in database using the using postgres connection.'
    })
  }

  @Test()
  public async shouldBeAbleToCreateSummoner({ request }: Context) {
    const response = await request.post('/api/v1/summoners', {
      body: {
        region: 'br1',
        nickname: 'iLenon7'
      }
    })

    response.assertStatusCode(201)
    response.assertBodyContains({
      region: 'br1',
      nickname: 'iLenon7'
    })
  }

  @Test()
  public async shouldThrowDuplicatedSummonerException({ request }: Context) {
    await Summoner.factory().count(1).create({ region: 'br1', nickname: 'iLenon7' })

    const response = await request.post('/api/v1/summoners', {
      body: {
        region: 'br1',
        nickname: 'iLenon7'
      }
    })

    response.assertStatusCode(400)
    response.assertBodyContains({
      statusCode: 400,
      code: 'E_DUPLICATED_SUMMONER_ERROR',
      name: 'DuplicatedSummonerException',
      message: 'The summoner iLenon7 with region br1 already exists in database.',
      help: 'A summoner can only exists with the same nickname in different regions.'
    })
  }

  @Test()
  public async shouldBeAbleToUpdateSummoner({ request }: Context) {
    await Summoner.factory().count(1).create({ region: 'br1', nickname: 'iLenon7' })

    const response = await request.put('/api/v1/summoners/br1/iLenon7')

    response.assertStatusCode(200)
    response.assertBodyContains({
      region: 'br1',
      nickname: 'iLenon7'
    })
  }
}
