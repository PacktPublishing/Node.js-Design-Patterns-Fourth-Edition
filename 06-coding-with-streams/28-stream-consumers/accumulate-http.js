import { request } from 'node:https'

const req = request('https://jsonplaceholder.typicode.com/todos/1', res => {
  let data = ''
  res.on('data', chunk => {
    data += chunk
  })
  res.on('end', () => {
    console.log(JSON.parse(data))
  })
})
req.end()
