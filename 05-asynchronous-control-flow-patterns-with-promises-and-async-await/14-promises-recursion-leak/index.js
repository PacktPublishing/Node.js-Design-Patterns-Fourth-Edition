function delay(milliseconds) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(new Date())
    }, milliseconds)
  })
}

function leakingLoop() {
  return delay(1).then(() => {
    console.log(`Tick ${Date.now()}`)
    return leakingLoop()
  })
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function nonLeakingLoop() {
  delay(1).then(() => {
    console.log(`Tick ${Date.now()}`)
    nonLeakingLoop()
  })
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function nonLeakingLoopWithErrors() {
  return new Promise((_resolve, reject) => {
    ;(function internalLoop() {
      delay(1)
        .then(() => {
          console.log(`Tick ${Date.now()}`)
          internalLoop()
        })
        .catch(err => {
          reject(err)
        })
    })()
  })
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function nonLeakingLoopAsync() {
  while (true) {
    await delay(1)
    console.log(`Tick ${Date.now()}`)
  }
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function leakingLoopAsync() {
  await delay(1)
  console.log(`Tick ${Date.now()}`)
  return leakingLoopAsync()
}

for (let i = 0; i < 1e6; i++) {
  leakingLoop()
  // nonLeakingLoop()
  // nonLeakingLoopWithErrors()
  // nonLeakingLoopAsync()
  // leakingLoopAsync()
}
