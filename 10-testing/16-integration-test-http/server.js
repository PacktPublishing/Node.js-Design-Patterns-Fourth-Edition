import { createApp } from './app.js'
import { DbClient } from './dbClient.js'
import { createTables } from './dbSetup.js'

const db = new DbClient('data/db.sqlite')
await createTables(db)

const app = await createApp(db)
app.listen({ port: 3000 })
