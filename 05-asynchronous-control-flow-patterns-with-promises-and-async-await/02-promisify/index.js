import { randomBytes } from 'node:crypto'

function promisify(callbackBasedFn) {
  return function promisifiedFn(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        (err, result) => {
          if (err) {
            return reject(err)
          }

          resolve(result)
        },
      ]
      callbackBasedFn(...newArgs)
    })
  }
}

const randomBytesP = promisify(randomBytes)
randomBytesP(32).then(buffer => {
  console.log(`Random bytes: ${buffer.toString()}`)
})
