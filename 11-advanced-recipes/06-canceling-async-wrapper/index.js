import { asyncRoutine } from './asyncRoutine.js'
import { CancelError } from './cancelError.js'
import { createCancelWrapper } from './cancelWrapper.js'

async function cancelable(callIfNotCanceled) {
  const resA = await callIfNotCanceled(asyncRoutine, 'A')
  console.log(resA)
  const resB = await callIfNotCanceled(asyncRoutine, 'B')
  console.log(resB)
  const resC = await callIfNotCanceled(asyncRoutine, 'C')
  console.log(resC)
}

const { callIfNotCanceled, cancel } = createCancelWrapper()
setTimeout(cancel, 100)

try {
  await cancelable(callIfNotCanceled)
} catch (err) {
  if (err instanceof CancelError) {
    console.log('Function canceled')
  } else {
    console.error(err)
  }
}
