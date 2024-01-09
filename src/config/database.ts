import { Env } from '@athenna/config'

export default {
  default: Env('DB_CONNECTION', ''),
  connections: {
    fake: {
      driver: 'fake',
      validations: false
    },

    postgres: {
      driver: 'postgres',
      connection: {
        host: Env('DB_HOST', 'localhost'),
        port: Env('DB_PORT', 5432),
        user: Env('DB_USER', 'root'),
        password: Env('DB_PASSWORD', 'root'),
        database: Env('DB_DATABASE', 'athenna')
      },
      debug: false
    }
  }
}
