import { Readable } from 'node:stream'
import { CheckUrls } from './checkUrls.js'

const checkUrls = new CheckUrls([
  'https://nodejsdesignpatterns.com',
  'https://loige.co',
  'https://mario.fyi',
  'https://httpstat.us/200',
  'https://httpstat.us/200?sleep=6000',
])

const stats = await Readable.from(checkUrls)
  .map(status => {
    console.log(status)
    return status
  })
  .reduce(
    (acc, status) => {
      if (status.includes(' is up,')) {
        acc.up++
      } else {
        acc.down++
      }
      return acc
    },
    { up: 0, down: 0 }
  )

console.log(stats)
