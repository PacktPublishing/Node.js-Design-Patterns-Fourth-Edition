import { promises as fs } from 'node:fs'
import { dirname } from 'node:path'
import { Writable } from 'node:stream'
import { mkdirp } from 'mkdirp' // v3.0.1

export class ToFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true })
  }

  _write(chunk, _encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb)
  }
}
