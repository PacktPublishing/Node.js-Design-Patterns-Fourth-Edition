import { test } from 'node:test'

test('passing sync test', _t => {})
test('failing sync test', _t => {
  throw new Error('fail')
})

test('passing async test with promise', _t => Promise.resolve())
test('failing async test with promise', _t => Promise.reject(new Error('fail')))

test('passing async test with async', async _t => {})
// biome-ignore lint/suspicious/useAwait: just for demonstration
test('failing async test with async', async _t => {
  throw new Error('fail')
})

test('passing async test with callback', (_t, done) => done())
test('failing async test with callback', (_t, done) => done(new Error('fail')))
// biome-ignore lint/suspicious/useAwait: just for demonstration
test('invalid test: both cb and promise (async)', async (_t, done) => {
  done()
})
