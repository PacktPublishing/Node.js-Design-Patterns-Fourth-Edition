const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
const buffer = await res.json()
console.log(buffer)
