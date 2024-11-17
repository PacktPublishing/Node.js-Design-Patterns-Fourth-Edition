import { readFile, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { gzip } from 'node:zlib'
const gzipPromise = promisify(gzip) // note: gzip is a callback-based function

const filename = process.argv[2]

const data = await readFile(filename)
const gzippedData = await gzipPromise(data)
await writeFile(`${filename}.gz`, gzippedData)

console.log('File successfully compressed')
