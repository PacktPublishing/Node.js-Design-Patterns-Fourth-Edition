import { createWriteStream } from 'node:fs'
import { createServer } from 'node:http'
import { basename, join } from 'node:path'

const destDir = join(import.meta.dirname, 'received_files')

const server = createServer((req, res) => {
  const filename = basename(req.headers['x-filename'])
  const destFilename = join(destDir, filename)
  console.log(`File request received: ${filename}`)
  req.pipe(createWriteStream(destFilename)).on('finish', () => {
    res.writeHead(201, { 'Content-Type': 'text/plain' })
    res.end('OK\n')
    console.log(`File saved: ${destFilename}`)
  })
})

server.listen(3000, () => console.log('Listening on http://localhost:3000'))
