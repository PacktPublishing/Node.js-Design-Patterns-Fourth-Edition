import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { Readable, compose } from 'node:stream'
import { createGunzip } from 'node:zlib'

const uncompressedData = compose(
  createReadStream('data.csv.gz'),
  createGunzip()
)
const byLine = Readable.from(createInterface({ input: uncompressedData }))

const totalProfit = await byLine
  .drop(1)
  .map(chunk => {
    const [type, country, profit] = chunk.toString().split(',')
    return { type, country, profit: Number.parseFloat(profit) }
  })
  .filter(record => record.country === 'Italy')
  .reduce((acc, record) => acc + record.profit, 0)

console.log(totalProfit)
