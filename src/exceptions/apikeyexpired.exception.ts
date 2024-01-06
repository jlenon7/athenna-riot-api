import { Exception } from '@athenna/common'

export class ApiKeyExpiredException extends Exception {
  public constructor() {
    const status = 500
    const help =
      'Go to your account preferences in Riot developer portal and generate a new key.'
    const code = 'E_API_KEY_EXPIRED_ERROR'
    const message = 'The apiKey for riot API is expired.'

    super({ code, help, status, message })
  }
}
