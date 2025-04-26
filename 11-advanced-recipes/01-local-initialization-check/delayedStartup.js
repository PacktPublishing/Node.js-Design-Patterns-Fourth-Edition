import { db } from './db.js'

async function getConnectedDb() {
  await db.connect()
  return db
}

async function getUsers(db) {
  await db.query('SELECT * FROM users')
}

const connectedDb = await getConnectedDb()
await getUsers(connectedDb)
