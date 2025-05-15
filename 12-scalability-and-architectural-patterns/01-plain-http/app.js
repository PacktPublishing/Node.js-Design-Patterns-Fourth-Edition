import { createServer } from 'node:http'

const server = createServer((_req, res) => {
  // simulates CPU intensive work
  let i = 1e7
  while (i > 0) {
    i--
  }

  console.log(`Handling request from ${process.pid}`)
  res.end(`Hello from ${process.pid}\n`)
})

server.listen(8080, () => console.log(`Started at ${process.pid}`))
