const A_CHAR_CODE = 'A'.charCodeAt(0) // 65
const Z_CHAR_CODE = 'Z'.charCodeAt(0) // 90

function createAlphabetIterableIterator() {
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
    [Symbol.iterator]() {
      return this
    },
  }
}

// // If you want to use the iterator API
// const iterator = createAlphabetIterableIterator()
// let iterationResult = iterator.next()
// while (!iterationResult.done) {
//   console.log(iterationResult.value)
//   iterationResult = iterator.next()
// }

// Using the iterable API
for (const letter of createAlphabetIterableIterator()) {
  console.log(letter)
}

// or
const letters = [...createAlphabetIterableIterator()]
console.log(letters)
