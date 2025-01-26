import { createObservable } from './create-observable.js'

function calculateTotal(invoice) {
  // (1)
  return invoice.subtotal - invoice.discount + invoice.tax
}

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20,
}
let total = calculateTotal(invoice)
console.log(`Starting total: ${total}`)

const obsInvoice = createObservable(
  // (2)
  invoice,
  ({ prop, prev, curr }) => {
    total = calculateTotal(invoice)
    console.log(`TOTAL: ${total} (${prop} changed: ${prev} -> ${curr})`)
  }
)

// (3)
obsInvoice.subtotal = 200 // TOTAL: 210
obsInvoice.discount = 20 // TOTAL: 200
obsInvoice.discount = 20 // no change: doesn't notify
obsInvoice.tax = 30 // TOTAL: 210

console.log(`Final total: ${total}`)
