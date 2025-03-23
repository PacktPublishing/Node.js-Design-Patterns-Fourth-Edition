import { equal } from 'node:assert/strict'
import { test } from 'node:test'
import { calculateBasketTotal } from './calculateBasketTotal.js'

test('Calculates basket total', { concurrency: true }, t => {
  const cases = [
    {
      name: 'Empty basket',
      basket: { items: [] },
      expectedTotal: 0,
    },
    // the following lines are intentionally commented to show a gap in test coverage
    // {
    //   name: 'One croissant',
    //   basket: { items: [{ name: 'Croissant', unitPrice: 2, quantity: 1 }] },
    //   expectedTotal: 2,
    // },
    // {
    //   name: 'Two croissants and one olive bread',
    //   basket: {
    //     items: [
    //       { name: 'Croissant', unitPrice: 2, quantity: 2 },
    //       { name: 'Olive bread', unitPrice: 3, quantity: 1 },
    //     ],
    //   },
    //   expectedTotal: 7,
    // },
  ]

  for (const { name, basket, expectedTotal } of cases) {
    t.test(name, () => {
      const result = calculateBasketTotal(basket)
      equal(
        result,
        expectedTotal,
        `Expected total to be ${expectedTotal}, but got ${result}`
      )
    })
  }
})
