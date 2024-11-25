import { createReadStream, createWriteStream } from 'node:fs'
import { Readable, Transform } from 'node:stream'

export function concatFiles(dest, files) {
  return new Promise((resolve, reject) => {
    const destStream = createWriteStream(dest)
    Readable.from(files)
      .pipe(
        new Transform({
          objectMode: true,
          transform(filename, _enc, done) {
            const src = createReadStream(filename)
            src.pipe(destStream, { end: false })
            src.on('error', done)
            src.on('end', done)
          },
        })
      )
      .on('error', reject)
      .on('finish', () => {
        destStream.end()
        resolve()
      })
  })
}
