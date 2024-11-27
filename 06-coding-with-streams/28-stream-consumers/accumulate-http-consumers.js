import { request } from 'node:https'
import consumers from 'node:stream/consumers'

const req = request(
  'https://jsonplaceholder.typicode.com/todos/1',
  async res => {
    const data = await consumers.json(res)
    console.log(data)
  }
)
req.end()
