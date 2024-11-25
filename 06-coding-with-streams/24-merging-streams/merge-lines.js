import { createReadStream, createWriteStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { Readable, Transform } from 'node:stream'

const [, , dest, ...sources] = process.argv
const destStream = createWriteStream(dest)

let endCount = 0
for (const source of sources) {
  const sourceStream = createReadStream(source, { highWaterMark: 16 })
  const linesStream = Readable.from(createInterface({ input: sourceStream }))
  const addLineEnd = new Transform({
    transform(chunk, _encoding, cb) {
      cb(null, `${chunk}\n`)
    },
  })

  sourceStream.on('end', () => {
    if (++endCount === sources.length) {
      destStream.end()
      console.log(`${dest} created`)
    }
  })
  linesStream.pipe(addLineEnd).pipe(destStream, { end: false })
}
