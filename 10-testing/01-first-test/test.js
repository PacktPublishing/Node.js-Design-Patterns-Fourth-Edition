import { equal } from 'node:assert/strict'
import { calculateBasketTotal } from './calculateBasketTotal.js'

// arrange
const basket = {
  items: [
    { name: 'Croissant', unitPrice: 2, quantity: 2 },
    { name: 'Olive bread', unitPrice: 3, quantity: 1 },
  ],
}

// act
const result = calculateBasketTotal(basket)

// assert
const expectedTotal = 7 // (2 * 2) + (3 * 1) = 7
equal(
  result,
  expectedTotal,
  `Expected total to be ${expectedTotal}, but got ${result}`
)
console.log('Test passed!')
