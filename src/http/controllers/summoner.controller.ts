import { Inject } from '@athenna/ioc'
import { Controller, type Context } from '@athenna/http'
import { SummonerService } from '#src/providers/services/summoner.service'

@Controller()
export class SummonerController {
  @Inject()
  private readonly summonerService: SummonerService

  public async index({ data, request, response }: Context) {
    const paginated = await this.summonerService.paginate(
      request.param('region'),
      data.pagination
    )

    return response.status(200).send(paginated)
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
      request.input('region'),
      request.input('nickname')
    )

    return response.status(200).send(data)
  }

  public async delete({ request, response }: Context) {
    await this.summonerService.deleteOne(
      request.param('region'),
      request.param('nickname')
    )

    return response.status(204)
  }
}
