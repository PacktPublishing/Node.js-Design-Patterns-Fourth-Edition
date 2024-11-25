import { createReadStream, createWriteStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { pipeline } from 'node:stream/promises'
import { ParallelStream } from './parallel-stream.js'

const inputFile = createReadStream(process.argv[2])
const fileLines = createInterface({
  input: inputFile,
})
const checkUrls = new ParallelStream(async (url, _enc, push, done) => {
  if (!url) {
    return done()
  }
  try {
    await fetch(url, { method: 'HEAD', timeout: 5 * 1000 })
    push(`${url} is up\n`)
  } catch (err) {
    push(`${url} is down: ${err}\n`)
  }
  done()
})
const outputFile = createWriteStream('results.txt')

await pipeline(fileLines, checkUrls, outputFile)

console.log('All urls have been checked')
