import cluster from 'node:cluster'
import { createServer } from 'node:http'
import { cpus } from 'node:os'

if (cluster.isPrimary) {
  const availableCpus = cpus()
  console.log(`Clustering to ${availableCpus.length} processes`)
  for (const _ of availableCpus) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} crashed. Starting a new worker`)
      cluster.fork()
    }
  })
} else {
  setInterval(
    () => {
      if (Math.random() < 0.5) {
        throw new Error(`Ooops... ${process.pid} crashed!`)
      }
    },
    Math.ceil(Math.random() * 3) * 1000
  )
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
}
