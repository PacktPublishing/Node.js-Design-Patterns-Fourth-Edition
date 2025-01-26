import { join } from 'node:path'
import { Level } from 'level'
import { createFsAdapter } from './fs-adapter.js'

const db = new Level(join(import.meta.dirname, 'db'), {
  valueEncoding: 'binary',
})
const fs = createFsAdapter(db)

await fs.writeFile('file.txt', 'Hello!', 'utf8')
const res = await fs.readFile('file.txt', 'utf8')
console.log(res)

// try to read a missing file (throws an error)
await fs.readFile('missing.txt')
