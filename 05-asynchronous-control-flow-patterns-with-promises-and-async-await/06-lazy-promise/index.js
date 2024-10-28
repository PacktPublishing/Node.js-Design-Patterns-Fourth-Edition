import { LazyPromise } from './LazyPromise.js'

const lazyPromise = new LazyPromise(resolve => {
  console.log('Executor Started!')
  // simulate some async work to be done
  setTimeout(() => {
    resolve('Completed!')
  }, 1000)
})

console.log('Lazy Promise instance created!')
console.log(lazyPromise)
lazyPromise.then(value => {
  console.log(value)
  console.log(lazyPromise)
})
