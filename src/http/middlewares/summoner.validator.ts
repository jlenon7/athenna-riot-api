import { Middleware } from '@athenna/http'
import { Summoner } from '#src/database/models/summoner'
import type { Context, MiddlewareContract } from '@athenna/http'
import { DuplicatedSummonerException } from '#src/exceptions/duplicatedsummoner.exception'

@Middleware({ name: 'summoner.validator' })
export class SummonerValidator implements MiddlewareContract {
  public async handle({ request }: Context) {
    const region = request.input('region')
    const nickname = request.input('nickname')

    const exists = await Summoner.query()
      .where('region', region)
      .where('nickname', nickname)
      .exists()

    if (exists) {
      throw new DuplicatedSummonerException(region, nickname)
    }
  }
}
