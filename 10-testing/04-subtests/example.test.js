import { test } from 'node:test'

test('Top level test', async t => {
  await t.test('Subtest 1', async _t => {
    // ...
  })

  await t.test('Subtest 2', async _t => {
    // ...
  })
})
