import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { createGunzip, createGzip } from 'node:zlib'

const uppercasify = new Transform({
  transform(chunk, _enc, cb) {
    this.push(chunk.toString().toUpperCase())
    cb()
  },
})

await pipeline(
  process.stdin,
  createGunzip(),
  uppercasify,
  createGzip(),
  process.stdout
)
