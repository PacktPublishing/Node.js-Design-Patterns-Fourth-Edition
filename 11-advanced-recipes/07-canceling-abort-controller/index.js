import { asyncRoutine } from './asyncRoutine.js'

async function cancelable(abortSignal) {
  abortSignal.throwIfAborted()
  const resA = await asyncRoutine('A')
  console.log(resA)

  abortSignal.throwIfAborted()
  const resB = await asyncRoutine('B')
  console.log(resB)

  abortSignal.throwIfAborted()
  const resC = await asyncRoutine('C')
  console.log(resC)
}

const ac = new AbortController()
setTimeout(() => ac.abort(), 100)

try {
  await cancelable(ac.signal)
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Function canceled')
  } else {
    console.error(err)
  }
}
