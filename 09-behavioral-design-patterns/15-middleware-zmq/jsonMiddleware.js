export function jsonMiddleware() {
  return {
    inbound(message) {
      return JSON.parse(message.toString())
    },
    outbound(message) {
      return Buffer.from(JSON.stringify(message))
    },
  }
}
