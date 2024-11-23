import { createServer } from 'node:http'
import Chance from 'chance' // 1.1.12

const chance = new Chance()

const server = createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  do {
    res.write(`${chance.string()}\n`)
  } while (chance.bool({ likelihood: 95 }))
  res.end('\n\n')
  res.on('finish', () => console.log('All data sent'))
})

server.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
