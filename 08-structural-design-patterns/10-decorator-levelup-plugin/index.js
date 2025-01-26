import { join } from 'node:path'
import { Level } from 'level'
import { levelSubscribe } from './level-subscribe.js'

const dbPath = join(import.meta.dirname, 'db')
const db = new Level(dbPath, { valueEncoding: 'json' })
levelSubscribe(db)

db.subscribe({ doctype: 'message', language: 'en' }, (_k, val) =>
  console.log(val)
)
await db.put('1', {
  doctype: 'message',
  text: 'Hi',
  language: 'en',
})
await db.put('2', {
  doctype: 'company',
  name: 'ACME Co.',
})
