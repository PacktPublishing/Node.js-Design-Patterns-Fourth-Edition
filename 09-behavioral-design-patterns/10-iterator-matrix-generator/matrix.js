export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix
  }

  get(row, column) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError('Out of bounds')
    }
    return this.data[row][column]
  }

  set(row, column, value) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError('Out of bounds')
    }
    this.data[row][column] = value
  }

  *[Symbol.iterator]() {
    for (const row of this.data) {
      for (const cell of row) {
        yield cell
      }
    }
  }

  // // Even more concise using the generator delegation syntax:
  // *[Symbol.iterator]() {
  //   for (const row of this.data) {
  //     yield* row
  //   }
  // }

  // // Even (even!) more concise using Array.prototype.flat():
  // *[Symbol.iterator]() {
  //   yield* this.data.flat()
  // }
}
