import { test } from 'node:test'

test('Top level test', { concurrency: true }, t => {
  t.test('Subtest 1', async _t => {
    // ...
  })

  t.test('Subtest 2', async _t => {
    // ...
  })
})
