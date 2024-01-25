import { Database } from '@athenna/database'
import { Summoner } from '#src/database/models/summoner'
import { BaseHttpTest } from '@athenna/core/testing/BaseHttpTest'
import { REGION, NICKNAME } from '#tests/fixtures/constants/summoner'
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
  public async shouldBeAbleToGetPaginatedSummonersByRegion({ request }: Context) {
    const response = await request.get(`/api/v1/summoners/${REGION}`)

    response.assertStatusCode(200)
    response.assertBodyContains({
      meta: {
        itemCount: 10,
        totalItems: 10,
        totalPages: 1,
        currentPage: 0,
        itemsPerPage: 10
      },
      links: {
        first: '/api/v1/summoners/br1?limit=10',
        previous: '/api/v1/summoners/br1?page=0&limit=10',
        next: '/api/v1/summoners/br1?page=1&limit=10',
        last: '/api/v1/summoners/br1?page=1&limit=10'
      }
    })
    response.assertBodyContainsAllKeys(['meta', 'links', 'data'])
  }

  @Test()
  public async shouldBeAbleToGetASummonerByRegionAndItNicknameFromApi({ request }: Context) {
    await Summoner.factory().create({ nickname: NICKNAME })

    const response = await request.get(`/api/v1/summoners/${REGION}/${NICKNAME}`)

    response.assertStatusCode(200)
    response.assertBodyContains({
      region: REGION,
      nickname: NICKNAME
    })
  }

  @Test()
  public async shouldThrowNotFoundExceptionWhenSummonerDoesNotExist({ request }: Context) {
    const response = await request.get(`/api/v1/summoners/${REGION}/${NICKNAME}`)

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
        region: REGION,
        nickname: NICKNAME
      }
    })

    response.assertStatusCode(201)
    response.assertBodyContains({
      region: REGION,
      nickname: NICKNAME
    })
  }

  @Test()
  public async shouldThrowDuplicatedSummonerException({ request }: Context) {
    await Summoner.factory().count(1).create({ region: REGION, nickname: NICKNAME })

    const response = await request.post('/api/v1/summoners', {
      body: {
        region: REGION,
        nickname: NICKNAME
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
    await Summoner.factory().count(1).create({ region: REGION, nickname: NICKNAME })

    const response = await request.put('/api/v1/summoners', {
      body: {
        region: REGION,
        nickname: NICKNAME
      }
    })

    response.assertStatusCode(200)
    response.assertBodyContains({
      region: REGION,
      nickname: NICKNAME
    })
  }

  @Test()
  public async shouldThrowNotFoundExceptionWhenTryingToUpdateASummonerThatDoesNotExist({ request }: Context) {
    const response = await request.put('/api/v1/summoners', {
      body: {
        region: REGION,
        nickname: NICKNAME
      }
    })
    response.assertStatusCode(404)
    response.assertBodyContains({
      name: 'NotFoundDataException',
      code: 'E_NOT_FOUND_DATA_ERROR',
      message: 'Data not found in database.',
      help: 'Data not found in database using the using postgres connection.'
    })
  }

  @Test()
  public async shouldBeAbleToDeleteSummoner({ request }: Context) {
    await Summoner.factory().count(1).create({ region: REGION, nickname: NICKNAME })

    const response = await request.delete(`/api/v1/summoners/${REGION}/${NICKNAME}`)

    response.assertStatusCode(204)
  }

  @Test()
  public async shouldThrowNotFoundExceptionWhenTryingToDeleteASummonerThatDoesNotExist({ request }: Context) {
    const response = await request.delete(`/api/v1/summoners/${REGION}/${NICKNAME}`)

    response.assertStatusCode(404)
    response.assertBodyContains({
      name: 'NotFoundDataException',
      code: 'E_NOT_FOUND_DATA_ERROR',
      message: 'Data not found in database.',
      help: 'Data not found in database using the using postgres connection.'
    })
  }
}
