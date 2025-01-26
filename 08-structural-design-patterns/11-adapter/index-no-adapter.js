import fs from 'node:fs/promises'

await fs.writeFile('file.txt', 'Hello!', 'utf8')
const res = await fs.readFile('file.txt', 'utf8')
console.log(res)

// try to read a missing file (throws an error)
await fs.readFile('missing.txt')
