import cluster from 'node:cluster'
import { once } from 'node:events'
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
  process.on('SIGUSR2', async () => {
    const workers = Object.values(cluster.workers)
    for (const worker of workers) {
      console.log(`Stopping worker: ${worker.process.pid}`)
      worker.disconnect()
      await once(worker, 'exit')
      if (!worker.exitedAfterDisconnect) {
        continue
      }
      const newWorker = cluster.fork()
      await once(newWorker, 'listening')
    }
  })
} else {
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
