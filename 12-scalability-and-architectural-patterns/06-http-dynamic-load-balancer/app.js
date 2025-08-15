import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'
import portfinder from 'portfinder' // v1.0.37
import { ConsulClient } from './consul.js'

const serviceType = process.argv[2]
if (!serviceType) {
  console.error('Usage: node app.js <service-type>')
  process.exit(1)
}

const consulClient = new ConsulClient()

const port = await portfinder.getPort()
const address = process.env.ADDRESS || 'localhost'
const serviceId = randomUUID()

async function registerService() {
  await consulClient.registerService({
    id: serviceId,
    name: serviceType,
    address,
    port,
    tags: [serviceType],
  })

  console.log(`${serviceType} registered as ${serviceId} on ${address}:${port}`)
}

async function unregisterService(err) {
  err && console.error(err)
  console.log(`deregistering ${serviceId}`)
  try {
    await consulClient.deregisterService(serviceId)
  } catch (deregisterError) {
    console.error(`Failed to deregister service: ${deregisterError.message}`)
  }
  process.exit(err ? 1 : 0)
}

process.on('uncaughtException', unregisterService)
process.on('SIGINT', unregisterService)

const server = createServer((_req, res) => {
  // Simulate some processing time
  let i = 1e7
  while (i > 0) {
    i--
  }
  console.log(`Handling request from ${process.pid}`)
  res.end(`${serviceType} response from ${process.pid}\n`)
})

server.listen(port, address, async () => {
  console.log(`Started ${serviceType} on port ${port} with PID ${process.pid}`)
  await registerService()
})
