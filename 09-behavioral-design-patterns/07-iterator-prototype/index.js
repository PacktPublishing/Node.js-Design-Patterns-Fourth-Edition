class RangeIterator extends Iterator {
  #start
  #end
  #step
  #current

  constructor(start, end, step = 1) {
    super()
    this.#start = start
    this.#end = end
    this.#step = step
    this.#current = undefined
  }

  next() {
    this.#current =
      this.#current === undefined ? this.#start : this.#current + this.#step

    if (
      this.#step > 0 ? this.#current < this.#end : this.#current > this.#end
    ) {
      return { done: false, value: this.#current }
    }

    return { done: true }
  }
}

const range = new RangeIterator(1, 6)

let iterationResult = range.next()
while (!iterationResult.done) {
  console.log(iterationResult.value)
  iterationResult = range.next()
}

console.log(range instanceof Iterator) // true

// instances are also iterable
const numbers = [...new RangeIterator(1, 6)]
console.log(numbers)

// Builds an iterator from 0 to 10, filters out the odd numbers, doubles the remaining ones:

const zeroToTen = new RangeIterator(0, 10)
const doubledEven = zeroToTen
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .toArray()
console.log(doubledEven)

const zeroToTenIt = new RangeIterator(0, 10)
const doubledEvenIt = zeroToTenIt.filter(n => n % 2 === 0).map(n => n * 2)
console.log(doubledEvenIt.next()) // { done: false, value: 0 }
console.log(doubledEvenIt.next()) // { done: false, value: 4 }

// Compares with the eager version of the Array prototype:
const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const doubledEvenArray = numbersArray.filter(n => n % 2 === 0).map(n => n * 2)
console.log(doubledEvenArray)

// Iterator.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
//   .filter(n => n % 2 === 0)
//   .map(n => n * 2)
