import assert from 'node:assert/strict'
import { suite, test } from 'node:test'
import { setImmediate } from 'node:timers/promises'
import { canPayWithVouchers } from './payments.js'

const sampleRecords = [
  {
    id: 1,
    userId: 'user1',
    balance: 10,
    expiresAt: new Date(Date.now() + 1000),
  },
  {
    id: 2,
    userId: 'user1',
    balance: 5,
    expiresAt: new Date(Date.now() + 1000),
  },
  {
    id: 3,
    userId: 'user1',
    balance: 3,
    expiresAt: new Date(Date.now() + 1000),
  },
]

suite('canPayWithVouchers', { concurrency: true, timeout: 500 }, () => {
  test('Returns true if balance is enough', async t => {
    const dbMock = {
      query: t.mock.fn(async (_sql, _params) => {
        await setImmediate()
        return sampleRecords
      }),
    }

    const result = await canPayWithVouchers(dbMock, 'user1', 18)

    assert.equal(result, true)
    assert.equal(dbMock.query.mock.callCount(), 1)
  })

  test('Returns false if balance is not enough', async t => {
    const dbMock = {
      query: t.mock.fn(async (_sql, _params) => {
        await setImmediate()
        return sampleRecords
      }),
    }

    const result = await canPayWithVouchers(dbMock, 'user1', 19)

    assert.equal(result, false)
    assert.equal(dbMock.query.mock.callCount(), 1)
  })
})
