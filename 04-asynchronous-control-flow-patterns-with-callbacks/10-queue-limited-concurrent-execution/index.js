import { TaskQueue } from './TaskQueue.js'

const queue = new TaskQueue(2)

function makeSampleTask(name) {
  return cb => {
    console.log(`${name} started`, queue.stats())
    setTimeout(() => {
      console.log(`${name} completed`, queue.stats())
      cb()
    }, Math.random() * 2000)
  }
}

// A task that spawns other 2 sub tasks
function task1(cb) {
  console.log('Task 1 started', queue.stats())
  queue
    .pushTask(makeSampleTask('task1 -> subtask 1'))
    .pushTask(makeSampleTask('task1 -> subtask 2'))
  setTimeout(() => {
    console.log('Task 1 completed', queue.stats())
    cb()
  }, Math.random() * 2000)
}

// A task that spawns other 3 sub tasks
function task2(cb) {
  console.log('Task 2 started', queue.stats())
  queue
    .pushTask(makeSampleTask('task2 -> subtask 1'))
    .pushTask(makeSampleTask('task2 -> subtask 2'))
    .pushTask(makeSampleTask('task2 -> subtask 3'))
  setTimeout(() => {
    console.log('Task 2 completed', queue.stats())
    cb()
  }, Math.random() * 2000)
}

queue.pushTask(task1).pushTask(task2)
