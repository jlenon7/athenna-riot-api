import { Env } from '@athenna/config'

export default {
  default: Env('DB_CONNECTION', ''),
  connections: {
    sqlite: {
      driver: 'sqlite',
      connection: {
        filename: Env('DB_FILENAME', ':memory:')
      },
      debug: false
    },
    mysql: {
      driver: 'mysql',
      connection: {
        host: Env('DB_HOST', 'localhost'),
        port: Env('DB_PORT', 3306),
        user: Env('DB_USER', 'root'),
        password: Env('DB_PASSWORD', 'root'),
        database: Env('DB_DATABASE', 'athenna')
      },
      debug: false
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
    },
    mongo: {
      driver: 'mongo',
      url: Env('DB_URL', 'mongodb://root:root@localhost:27017/admin'),
      w: 'majority',
      retryWrites: true
    },
    fake: {
      driver: 'fake'
    }
  }
}
