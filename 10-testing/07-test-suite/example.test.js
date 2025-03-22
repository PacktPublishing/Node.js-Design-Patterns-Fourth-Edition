import { suite, test } from 'node:test'

suite('Top level suite', { concurrency: true }, () => {
  test('Test 1', () => {})
  test('Test 2', () => {})
})

// Equivalent to:
// import { describe, it } from 'node:test'

// describe('Top level suite', { concurrency: true }, () => {
//   it('Test 1', () => {})
//   it('Test 2', () => {})
// })
