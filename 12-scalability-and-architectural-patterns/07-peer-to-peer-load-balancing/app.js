import { createServer } from 'node:http'

const { pid } = process
const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const searchParams = url.searchParams

  console.log(`Request ${searchParams.get('request')} from ${pid}`)
  res.end(`Hello from ${pid}\n`)
})

const port = Number.parseInt(process.env.PORT || process.argv[2]) || 8080
server.listen(port, () => console.log(`Started at ${pid}`))
