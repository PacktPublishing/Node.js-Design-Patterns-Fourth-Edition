import { equal } from 'node:assert/strict'
import { test } from 'node:test'
import { calculateBasketTotal } from './calculateBasketTotal.js'

test('Calculates basket total', () => {
  const basket = {
    items: [
      { name: 'Croissant', unitPrice: 2, quantity: 2 },
      { name: 'Olive bread', unitPrice: 3, quantity: 1 },
    ],
  }

  const result = calculateBasketTotal(basket)

  const expectedTotal = 7
  equal(
    result,
    expectedTotal,
    `Expected total to be ${expectedTotal}, but got ${result}`
  )
})

test('Calculates basket total with no items', () => {
  const basket = {
    items: [],
  }

  const result = calculateBasketTotal(basket)

  const expectedTotal = 0
  equal(
    result,
    expectedTotal,
    `Expected total to be ${expectedTotal}, but got ${result}`
  )
})
