export function calculateBasketTotal(basket) {
  let total = 0
  for (const item of basket.items) {
    total += item.unitPrice * item.quantity
  }
  return total
}
