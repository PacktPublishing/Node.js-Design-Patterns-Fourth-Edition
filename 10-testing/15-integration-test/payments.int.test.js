import assert from 'node:assert/strict'
import { suite, test } from 'node:test'
import { DbClient } from './dbClient.js'
import { createTables } from './dbSetup.js'
import { canPayWithVouchers, getActiveVouchers } from './payments.js'

function addTestUser(db, id, name) {
  return db.query(
    `INSERT INTO users (id, name)
       VALUES (?, ?)`,
    [id, name]
  )
}

async function addTestVoucher(db, id, userId, balance, expiresAt) {
  const record = {
    id,
    userId,
    balance,
    expiresAt: expiresAt ?? new Date(Date.now() + 1000).toISOString(),
  }
  await db.query(
    `INSERT INTO vouchers (id, userId, balance, expiresAt)
        VALUES (?, ?, ?, ?)`,
    [record.id, record.userId, record.balance, record.expiresAt]
  )
  return record
}

suite('activeVouchers', { concurrency: true, timeout: 500 }, () => {
  test('queries for active vouchers', async () => {
    const expected = []
    const db = new DbClient(':memory:')
    await createTables(db)
    await addTestUser(db, 'user1', 'Test User 1')
    await addTestUser(db, 'user2', 'Test User 2')
    expected.push(await addTestVoucher(db, 'voucher1', 'user1', 10))
    expected.push(await addTestVoucher(db, 'voucher2', 'user1', 5))
    expected.push(await addTestVoucher(db, 'voucher3', 'user1', 3))
    // expired
    await addTestVoucher(
      db,
      'voucher4',
      'user1',
      10,
      new Date(Date.now() - 1000).toISOString()
    )
    // different user
    await addTestVoucher(db, 'voucher5', 'user2', 10)
    // zero balance
    await addTestVoucher(db, 'voucher6', 'user1', 0)

    const activeVouchers = await getActiveVouchers(db, 'user1')
    db.close()
    assert.deepEqual(activeVouchers, expected)
  })
})

suite('canPayWithVouchers', { concurrency: true, timeout: 500 }, () => {
  test('Returns true if balance is enough', async () => {
    const db = new DbClient(':memory:')
    await createTables(db)
    await addTestUser(db, 'user1', 'Test User 1')
    await addTestVoucher(db, 'voucher1', 'user1', 10)
    await addTestVoucher(db, 'voucher2', 'user1', 5)
    await addTestVoucher(db, 'voucher3', 'user1', 3)

    const result = await canPayWithVouchers(db, 'user1', 18)

    db.close()
    assert.equal(result, true)
  })

  test('Returns false if balance is not enough', async () => {
    const db = new DbClient(':memory:')
    await createTables(db)
    await addTestUser(db, 'user1', 'Test User 1')
    await addTestVoucher(db, 'voucher1', 'user1', 10)
    await addTestVoucher(db, 'voucher2', 'user1', 5)
    await addTestVoucher(db, 'voucher3', 'user1', 3)

    const result = await canPayWithVouchers(db, 'user1', 19)

    db.close()
    assert.equal(result, false)
  })
})
