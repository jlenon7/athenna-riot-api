import { Route } from '@athenna/http'

Route.group(() => {
  Route.get('/summoners/:region', 'SummonerController.index')
    .response(200, Config.get('swagger.summoners.index.200'))
    .tags(['Summoner'])

  Route.get('/summoners/:region/:nickname', 'SummonerController.show')
    .response(200, Config.get('swagger.summoners.show.200'))
    .tags(['Summoner'])

  Route.post('/summoners', 'SummonerController.store')
    .body('region')
    .body('nickname')
    .response(201, Config.get('swagger.summoners.store.201'))
    .tags(['Summoner'])
    .middleware('summoner.validator')

  Route.put('/summoners', 'SummonerController.update')
    .body('region')
    .body('nickname')
    .response(200, Config.get('swagger.summoners.update.200'))
    .tags(['Summoner'])

  Route.delete('/summoners/:region/:nickname', 'SummonerController.delete')
    .response(204, Config.get('swagger.summoners.delete.204'))
    .tags(['Summoner'])
}).prefix('/api/v1')
