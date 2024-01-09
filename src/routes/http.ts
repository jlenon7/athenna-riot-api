import { Route } from '@athenna/http'

Route.group(() => {
  Route.get('/summoners/:region', 'SummonerController.index')
    .response(200, Config.get('swagger.summoners.index.200'))
    .tags(['Summoner'])

  Route.get('/summoners/:region/:nickname', 'SummonerController.show')
    .response(200, Config.get('swagger.summoners.show.200'))
    .tags(['Summoner'])

  Route.put('/summoners/:region/:nickname', 'SummonerController.update')
    .response(200, Config.get('swagger.summoners.update.200'))
    .tags(['Summoner'])

  Route.post('/summoners', 'SummonerController.store')
    .body('region')
    .body('nickname')
    .response(201, Config.get('swagger.summoners.store.201'))
    .tags(['Summoner'])
    .middleware('summoner.validator')
}).prefix('/api/v1')
