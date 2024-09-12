setImmediate(() => {
  console.log('setImmediate(cb)')
})

setTimeout(() => {
  console.log('setTimeout(cb, 0)')
}, 0)

process.nextTick(() => {
  console.log('process.nextTick(cb)')
})

console.log('Sync operation')
