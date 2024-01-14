import { Ignite } from '@athenna/core'
import { Database } from '@athenna/database'

const ignite = await new Ignite().load(import.meta.url, { bootLogs: false })

const repl = await ignite.repl()

repl.importAll('#src/models/summoner')
repl.setInContext('Database', Database)
