function delay(milliseconds) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(Date.now())
    }, milliseconds)
  })
}

console.log(`Delaying... (${Date.now()})`)

delay(1000).then(newDate => {
  console.log(`Done (${newDate})`)
})
