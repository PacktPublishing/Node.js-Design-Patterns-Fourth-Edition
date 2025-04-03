export async function getActiveVouchers(db, userId) {
  const vouchers = await db.query(
    `SELECT * FROM vouchers 
       WHERE userId = ? AND 
       balance > 0 AND
       expiresAt > strftime('%FT%T:%fZ', 'now')`,
    [userId]
  )

  return vouchers
}

export async function canPayWithVouchers(db, userId, amount) {
  const vouchers = await getActiveVouchers(db, userId)
  const availableBalance = vouchers.reduce((acc, v) => acc + v.balance, 0)

  return availableBalance >= amount
}
