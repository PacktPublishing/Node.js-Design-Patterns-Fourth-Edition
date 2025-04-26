import { setTimeout } from 'node:timers/promises'
import { db } from './db.js'

db.connect()

async function updateLastAccess() {
  await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`)
}

updateLastAccess()
await setTimeout(600)
updateLastAccess()
