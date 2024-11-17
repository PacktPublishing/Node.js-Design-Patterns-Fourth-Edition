import { createReadStream } from 'node:fs'
import { request } from 'node:http'
import { basename } from 'node:path'
import { createGzip } from 'node:zlib'

const filename = process.argv[2]
const serverHost = process.argv[3]

const httpRequestOptions = {
  hostname: serverHost,
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip',
    'X-Filename': basename(filename),
  },
}

const req = request(httpRequestOptions, res => {
  console.log(`Server response: ${res.statusCode}`)
})

createReadStream(filename)
  .pipe(createGzip())
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully sent')
  })
