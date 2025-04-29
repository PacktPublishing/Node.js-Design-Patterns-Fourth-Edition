import { asyncRoutine } from './asyncRoutine.js'
import { CancelError } from './cancelError.js'
import { createAsyncCancelable } from './createAsyncCancelable.js'

const cancelable = createAsyncCancelable(function* () {
  const resA = yield asyncRoutine('A')
  console.log(resA)
  const resB = yield asyncRoutine('B')
  console.log(resB)
  const resC = yield asyncRoutine('C')
  console.log(resC)
})

const { promise, cancel } = cancelable()
setTimeout(cancel, 100)

try {
  await promise
} catch (err) {
  if (err instanceof CancelError) {
    console.log('Function canceled')
  } else {
    console.error(err)
  }
}
