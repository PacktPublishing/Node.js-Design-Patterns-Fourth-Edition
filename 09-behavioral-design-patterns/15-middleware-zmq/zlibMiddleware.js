import { promisify } from 'node:util'
import { deflateRaw, inflateRaw } from 'node:zlib'

const inflateRawAsync = promisify(inflateRaw)
const deflateRawAsync = promisify(deflateRaw)

export function zlibMiddleware() {
  return {
    inbound(message) {
      return inflateRawAsync(Buffer.from(message))
    },
    outbound(message) {
      return deflateRawAsync(message)
    },
  }
}
