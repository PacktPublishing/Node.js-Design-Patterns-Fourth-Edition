import { createReadStream } from 'node:fs'
import { basename } from 'node:path'
import { PassThrough } from 'node:stream'
import { createBrotliCompress } from 'node:zlib'
import { upload } from './upload.js'

const filepath = process.argv[2]
const filename = basename(filepath)
const contentStream = new PassThrough()

upload(`${filename}.br`, contentStream)
  .then(response => {
    console.log(`Server response: ${response.data}`)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

createReadStream(filepath).pipe(createBrotliCompress()).pipe(contentStream)
