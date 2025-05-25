import { createServer } from 'node:http'

const server = createServer((_req, res) => {
  let i = 1e7
  while (i > 0) {
    i--
  }
  console.log(`Handling request from ${process.pid}`)
  res.end(`Hello from ${process.pid}\n`)
})

const port = Number.parseInt(process.env.PORT || process.argv[2]) || 8080
server.listen(port, () => console.log(`Started at ${process.pid}`))
