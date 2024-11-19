import { createCipheriv, randomBytes } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { request } from 'node:http'
import { basename } from 'node:path'
import { createGzip } from 'node:zlib'

const filename = process.argv[2]
const serverHost = process.argv[3]
const secret = Buffer.from(process.argv[4], 'hex')
const iv = randomBytes(16)

const httpRequestOptions = {
  hostname: serverHost,
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'content-type': 'application/octet-stream',
    'content-encoding': 'gzip',
    'x-filename': basename(filename),
    'x-initialization-vector': iv.toString('hex'),
  },
}

const req = request(httpRequestOptions, res => {
  console.log(`Server response: ${res.statusCode}`)
})

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createCipheriv('aes192', secret, iv))
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully sent')
  })
