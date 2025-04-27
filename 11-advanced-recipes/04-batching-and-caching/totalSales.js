import { Level } from 'level'

const db = new Level('sales', { valueEncoding: 'json' })

export async function totalSales(product) {
  const now = Date.now()
  let sum = 0
  for await (const [_transactionId, transaction] of db.iterator()) {
    if (!product || transaction.product === product) {
      sum += transaction.amount
    }
  }

  console.log(`totalSales() took: ${Date.now() - now}ms`)

  return sum
}
