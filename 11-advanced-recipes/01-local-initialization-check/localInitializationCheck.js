import { db } from './db.js'

async function getUsers() {
  if (!db.connected) {
    await db.connect()
  }

  await db.query('SELECT * FROM users')
}

await getUsers()
