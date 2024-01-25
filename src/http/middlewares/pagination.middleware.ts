import { Middleware } from '@athenna/http'
import type { Context, MiddlewareContract } from '@athenna/http'

@Middleware({ name: 'pagination' })
export class PaginationMiddleware implements MiddlewareContract {
  public async handle(ctx: Context): Promise<void> {
    ctx.data.pagination = {
      page: parseInt(ctx.request.query('page', 0)),
      limit: parseInt(ctx.request.query('limit', 10)),
      resourceUrl: ctx.request.baseUrl
    }
  }
}
