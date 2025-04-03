import assert from 'node:assert/strict'
import { after, beforeEach, mock, suite, test } from 'node:test'
import { setImmediate } from 'node:timers/promises'

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

const queryMock = mock.fn(async (_sql, _params) => {
  await setImmediate()
  return sampleRecords
})

mock.module('./dbClient.js', {
  cache: false,
  namedExports: {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    DbClient: class DbMock {
      query = queryMock
    },
  },
})

const { canPayWithVouchers } = await import('./payments.js')

suite('canPayWithVouchers', { concurrency: false, timeout: 500 }, () => {
  beforeEach(() => {
    queryMock.mock.resetCalls()
  })

  after(() => {
    queryMock.mock.restore()
  })

  test('Returns true if balance is enough', async () => {
    const result = await canPayWithVouchers('user1', 18)

    assert.equal(result, true)
    assert.equal(queryMock.mock.callCount(), 1)
  })

  test('Returns false if balance is not enough', async () => {
    const result = await canPayWithVouchers('user1', 19)

    assert.equal(result, false)
    assert.equal(queryMock.mock.callCount(), 1)
  })
})
