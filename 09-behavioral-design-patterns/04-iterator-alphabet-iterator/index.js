const A_CHAR_CODE = 'A'.charCodeAt(0) // 65
const Z_CHAR_CODE = 'Z'.charCodeAt(0) // 90

function createAlphabetIterator() {
  let currCode = A_CHAR_CODE

  return {
    next() {
      const currChar = String.fromCodePoint(currCode)
      if (currCode > Z_CHAR_CODE) {
        return { done: true }
      }

      currCode++
      return { value: currChar, done: false }
    },
  }
}

const iterator = createAlphabetIterator()
let iterationResult = iterator.next()

while (!iterationResult.done) {
  console.log(iterationResult.value)
  iterationResult = iterator.next()
}
