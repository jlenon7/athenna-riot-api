export default {
  default: Env('LOG_CHANNEL', 'stack'),
  channels: {
    stack: {
      driver: 'stack',
      channels: ['simple']
    },

    simple: {
      driver: 'console',
      level: 'trace',

      formatter: 'simple'
    }
  }
}
