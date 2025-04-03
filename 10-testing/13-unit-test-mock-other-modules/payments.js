import { DbClient } from './dbClient.js'

const db = new DbClient()

export async function canPayWithVouchers(userId, amount) {
  const vouchers = await db.query(
    `SELECT * FROM vouchers 
       WHERE user_id = ? AND 
       balance > 0 AND
       expiresAt > NOW()`,
    [userId]
  )

  const availableBalance = vouchers.reduce((acc, v) => acc + v.balance, 0)

  return availableBalance >= amount
}
