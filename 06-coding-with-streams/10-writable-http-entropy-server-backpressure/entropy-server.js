import { createServer } from 'node:http'
import Chance from 'chance' // 1.1.12

const CHUNK_SIZE = 16 * 1024 - 1
const chance = new Chance()

const server = createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  let backPressureCount = 0
  let bytesSent = 0
  function generateMore() {
    do {
      const randomChunk = chance.string({ length: CHUNK_SIZE })
      const shouldContinue = res.write(`${randomChunk}\n`)
      bytesSent += CHUNK_SIZE
      if (!shouldContinue) {
        console.warn(`back-pressure x${++backPressureCount}`)
        return res.once('drain', generateMore)
      }
    } while (chance.bool({ likelihood: 95 }))
    res.end('\n\n')
  }

  generateMore()

  res.on('finish', () => console.log(`Sent ${bytesSent} bytes`))
})

server.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
