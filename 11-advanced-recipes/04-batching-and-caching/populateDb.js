import { Level } from 'level'
import { nanoid } from 'nanoid'

const db = new Level('sales', { valueEncoding: 'json' })
const products = ['book', 'game', 'app', 'song', 'movie']

async function populate() {
  for (let i = 0; i < 100000; i++) {
    await db.put(nanoid(), {
      amount: Math.ceil(Math.random() * 100),
      product: products[Math.floor(Math.random() * 5)],
    })
  }

  console.log('DB populated')
}

populate()
