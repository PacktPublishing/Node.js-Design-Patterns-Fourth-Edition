import { createDecipheriv, randomBytes } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { createServer } from 'node:http'
import { basename, join } from 'node:path'
import { createGunzip } from 'node:zlib'

const secret = randomBytes(24)
console.log(`Generated secret: ${secret.toString('hex')}`)

const server = createServer((req, res) => {
  const filename = basename(req.headers['x-filename'])
  const destFilename = join(import.meta.dirname, 'received_files', filename)
  const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex')
  console.log(`File request received: ${filename}`)
  req
    .pipe(createDecipheriv('aes192', secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      res.writeHead(201, { 'content-type': 'text/plain' })
      res.end('OK\n')
      console.log(`File saved: ${destFilename}`)
    })
})

server.listen(3000, () => console.log('Listening on http://localhost:3000'))
