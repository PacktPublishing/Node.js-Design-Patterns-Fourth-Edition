function* twoWayGenerator() {
  try {
    const who = yield null
    yield `Hello ${who}`
  } catch (err) {
    yield `Hello error: ${err.message}`
  }
}

console.log('Passing a value back to the generator:')
const twoWay = twoWayGenerator()
twoWay.next()
console.log(twoWay.next('world'))

console.log('Using throw():')
const twoWayException = twoWayGenerator()
twoWayException.next()
console.log(twoWayException.throw(new Error('Boom!')))

console.log('Using return():')
const twoWayReturn = twoWayGenerator()
console.log(twoWayReturn.return('myReturnValue'))
