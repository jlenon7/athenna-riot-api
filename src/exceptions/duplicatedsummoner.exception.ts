import { Exception } from '@athenna/common'

export class DuplicatedSummonerException extends Exception {
  public constructor(region: string, nickname: string) {
    const status = 400
    const help =
      'A summoner can only exists with the same nickname in different regions.'
    const code = 'E_DUPLICATED_SUMMONER_ERROR'
    const message = `The summoner ${nickname} with region ${region} already exists in database.`

    super({ code, help, status, message })
  }
}
