const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
const data = await res.json()
console.log(data)
