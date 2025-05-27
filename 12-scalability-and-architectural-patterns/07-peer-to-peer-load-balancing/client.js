import { balancedRequest } from './balancedRequest.js'

for (let i = 0; i < 10; i++) {
  const response = await balancedRequest(`/?request=${i}`)
  const body = await response.text()
  console.log(
    `Request ${i} completed\nStatus: ${response.status}\nBody: ${body}`
  )
}
