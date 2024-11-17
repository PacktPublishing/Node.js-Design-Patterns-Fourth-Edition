import { createReadStream, createWriteStream } from 'node:fs'
import { createGzip } from 'node:zlib'

const filename = process.argv[2]

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createWriteStream(`${filename}.gz`))
  .on('finish', () => console.log('File successfully compressed'))
