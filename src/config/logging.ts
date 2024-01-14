export default {
  default: Env('LOG_CHANNEL', 'stack'),
  channels: {
    stack: {
      driver: 'stack',
      channels: ['simple']
    },
    request: {
      driver: 'console',
      formatter: 'request',
      level: 'trace',
      asJson: Env('APP_ENV') === 'production'
    },
    simple: {
      driver: 'console',
      level: 'trace',
      formatter: Env('APP_ENV') === 'production' ? 'json' : 'simple'
    }
  }
}
