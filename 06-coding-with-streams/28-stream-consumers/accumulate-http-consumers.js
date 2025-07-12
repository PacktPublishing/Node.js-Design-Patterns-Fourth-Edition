import { request } from 'node:https'
import consumers from 'node:stream/consumers'

const req = request(
  'https://jsonplaceholder.typicode.com/todos/1',
  async res => {
    const buffer = await consumers.json(res)
    console.log(buffer)
  }
)
req.end()
