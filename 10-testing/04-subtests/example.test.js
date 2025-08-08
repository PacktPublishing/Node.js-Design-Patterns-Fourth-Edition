import { test } from 'node:test'

test('Top level test', t => {
  t.test('Subtest 1', _t => {
    // ...
  })

  t.test('Subtest 2', _t => {
    // ...
  })
})
