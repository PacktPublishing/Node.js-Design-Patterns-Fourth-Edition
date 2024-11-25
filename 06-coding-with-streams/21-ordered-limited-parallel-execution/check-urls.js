import { createReadStream, createWriteStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { pipeline } from 'node:stream/promises'
import parallelTransform from 'parallel-transform' // v1.2.0

const inputFile = createReadStream(process.argv[2])
const fileLines = createInterface({
  input: inputFile,
})
const checkUrls = parallelTransform(8, async function (url, done) {
  if (!url) {
    return done()
  }
  try {
    await fetch(url, { method: 'HEAD', timeout: 5 * 1000 })
    this.push(`${url} is up\n`)
  } catch (err) {
    this.push(`${url} is down: ${err}\n`)
  }
  done()
})
const outputFile = createWriteStream('results.txt')

await pipeline(fileLines, checkUrls, outputFile)

console.log('All urls have been checked')
