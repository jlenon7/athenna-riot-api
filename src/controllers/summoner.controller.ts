import { Inject } from '@athenna/ioc'
import { Controller, type Context } from '@athenna/http'
import { SummonerService } from '#src/services/summoner.service'

@Controller()
export class SummonerController {
  @Inject()
  private readonly summonerService: SummonerService

  public async index({ request, response }: Context) {
    const data = await this.summonerService.findAll(request.param('region'))

    return response.status(200).send(data)
  }

  public async show({ request, response }: Context) {
    const data = await this.summonerService.findOne(
      request.param('region'),
      request.param('nickname')
    )

    return response.status(200).send(data)
  }

  public async store({ request, response }: Context) {
    const data = await this.summonerService.createOne(
      request.input('region'),
      request.input('nickname')
    )

    return response.status(201).send(data)
  }

  public async update({ request, response }: Context) {
    const data = await this.summonerService.updateOne(
      request.param('region'),
      request.param('nickname')
    )

    return response.status(200).send(data)
  }
}
