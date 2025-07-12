import { request } from 'node:https'

const req = request('https://jsonplaceholder.typicode.com/todos/1', res => {
  let buffer = ''
  res.on('data', chunk => {
    buffer += chunk
  })
  res.on('end', () => {
    console.log(JSON.parse(buffer))
  })
})
req.end()
