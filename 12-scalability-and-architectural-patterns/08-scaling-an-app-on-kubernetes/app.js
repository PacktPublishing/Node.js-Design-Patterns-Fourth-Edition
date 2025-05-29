import { createServer } from 'node:http'
import { hostname } from 'node:os'

const version = 1

const server = createServer((_req, res) => {
  res.end(`Hello from ${hostname()} (v${version})`)
})

server.listen(8080)
