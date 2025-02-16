export type ConfigData = {
  listen: {
    port: number
    host: string
  }
  timeouts: {
    headersTimeoutMs: number
    keepAliveTimeoutMs: number
    requestTimeoutMs: number
  }
  env: Record<string, string>
}
