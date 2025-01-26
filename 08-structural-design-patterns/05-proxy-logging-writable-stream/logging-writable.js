export function createLoggingWritable(writable) {
  return new Proxy(writable, {
    get(target, propKey, _receiver) {
      if (propKey === 'write') {
        return (...args) => {
          const [chunk] = args
          console.log('Writing', chunk)
          return writable.write(...args)
        }
      }
      return target[propKey]
    },
  })
}
