function delay(milliseconds) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(Date.now())
    }, milliseconds)
  })
}

async function playingWithDelays() {
  console.log('Delaying...', Date.now())

  const timeAfterOneSecond = await delay(1000)
  console.log(timeAfterOneSecond)

  const timeAfterThreeSeconds = await delay(3000)
  console.log(timeAfterThreeSeconds)

  return 'done'
}

playingWithDelays().then(result => {
  console.log(`After 4 seconds: ${result}`)
})
