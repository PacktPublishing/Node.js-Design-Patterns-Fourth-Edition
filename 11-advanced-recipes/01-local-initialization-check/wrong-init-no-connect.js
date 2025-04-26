import { db } from './db.js'

const users = await db.query('SELECT * FROM users')
console.log(users)
