import assert from 'node:assert/strict'
import { createReadStream, createWriteStream } from 'node:fs'
import { Transform, pipeline } from 'node:stream'

const streamA = createReadStream('package.json')
const streamB = new Transform({
  transform(chunk, _enc, done) {
    this.push(chunk.toString().toUpperCase())
    done()
  },
})
const streamC = createWriteStream('package-uppercase.json')

const pipelineReturn = pipeline(streamA, streamB, streamC, () => {
  // handle errors here
})
// biome-ignore lint/suspicious/noMisplacedAssertion: Not an actual unit test
assert.equal(streamC, pipelineReturn) // valid

const pipeReturn = streamA.pipe(streamB).pipe(streamC)

// biome-ignore lint/suspicious/noMisplacedAssertion: Not an actual unit test
assert.equal(streamC, pipeReturn) // valid
