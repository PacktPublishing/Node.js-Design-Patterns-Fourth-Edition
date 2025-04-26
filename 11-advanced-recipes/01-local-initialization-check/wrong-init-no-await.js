import { db } from './db.js'

db.connect()
const users = await db.query('SELECT * FROM users')
console.log(users)
