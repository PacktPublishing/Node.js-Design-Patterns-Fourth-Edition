const servers = [
  { host: 'localhost', port: 8081 },
  { host: 'localhost', port: 8082 },
]
let i = 0

export function balancedRequest(url, fetchOptions = {}) {
  i = (i + 1) % servers.length
  const server = servers[i]

  const rewrittenUrl = new URL(url, `http://${server.host}:${server.port}`)
  rewrittenUrl.host = `${server.host}:${server.port}`

  return fetch(rewrittenUrl.toString(), fetchOptions)
}
