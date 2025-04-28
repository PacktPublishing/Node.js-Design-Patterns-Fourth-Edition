import { CancelError } from './cancelError.js'

export function createCancelWrapper() {
  let cancelRequested = false

  function cancel() {
    cancelRequested = true
  }

  function callIfNotCanceled(func, ...args) {
    if (cancelRequested) {
      return Promise.reject(new CancelError())
    }
    return func(...args)
  }

  return { callIfNotCanceled, cancel }
}
