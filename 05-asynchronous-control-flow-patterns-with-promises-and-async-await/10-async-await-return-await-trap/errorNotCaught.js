function delayError(milliseconds) {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Error after ${milliseconds}ms`))
    }, milliseconds)
  })
}

// biome-ignore lint/suspicious/useAwait: We are showing the trap of not using await
async function errorNotCaught() {
  try {
    return delayError(1000)
  } catch (err) {
    console.error(`Error caught by the async function: ${err.message}`)
  }
}

errorNotCaught().catch(err =>
  console.error(`Error caught by the caller: ${err.message}`)
)
