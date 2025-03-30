import assert from 'node:assert/strict'
import { once } from 'node:events'
import { mock, suite, test } from 'node:test'
import { setImmediate } from 'node:timers/promises'
import { TaskQueue } from './TaskQueue.js'

suite('TaskQueue', { concurrency: true, timeout: 500 }, () => {
  test('All tasks are executed and empty is emitted', async () => {
    const queue = new TaskQueue(2)
    const task1status = Promise.withResolvers()
    let task1Completed = false
    const task2status = Promise.withResolvers()
    let task2Completed = false

    const task1 = async () => {
      await setImmediate()
      task1Completed = true
      task1status.resolve()
    }
    const task2 = async () => {
      await setImmediate()
      task2Completed = true
      task2status.resolve()
    }

    queue.pushTask(task1).pushTask(task2)
    await Promise.allSettled([task1status.promise, task2status.promise])

    assert.ok(task1Completed, 'Task 1 completed')
    assert.ok(task2Completed, 'Task 2 completed')
    await once(queue, 'empty')
  })

  test('All tasks are executed and empty is emitted (v2)', async () => {
    const queue = new TaskQueue(2)

    const task1 = mock.fn(async () => {
      await setImmediate()
      return 'completed'
    })
    const task2 = mock.fn(async () => {
      await setImmediate()
      return 'completed'
    })

    queue.pushTask(task1).pushTask(task2)
    await once(queue, 'empty')

    assert.equal(task1.mock.callCount(), 1)
    assert.equal(task2.mock.callCount(), 1)
  })

  test('Respect the concurrency limit', async () => {
    const queue = new TaskQueue(4)
    let runningTasks = 0
    let maxRunningTasks = 0
    let completedTasks = 0
    const task = async () => {
      runningTasks++
      maxRunningTasks = Math.max(maxRunningTasks, runningTasks)
      await setImmediate()
      runningTasks--
      completedTasks++
    }

    queue
      .pushTask(task)
      .pushTask(task)
      .pushTask(task)
      .pushTask(task)
      .pushTask(task)
    await once(queue, 'empty')

    assert.equal(maxRunningTasks, 4)
    assert.equal(completedTasks, 5)
  })

  test('Emits "taskError" on task failure', async () => {
    const queue = new TaskQueue(2)
    const errors = []
    queue.on('taskError', error => {
      errors.push(error)
    })

    queue.pushTask(async () => {
      await setImmediate()
      throw new Error('error1')
    })
    queue.pushTask(async () => {
      await setImmediate()
      throw new Error('error2')
    })
    await once(queue, 'empty')

    assert.equal(errors.length, 2)
    assert.equal(errors[0].message, 'error1')
    assert.equal(errors[1].message, 'error2')
  })

  test.todo('stats() returns correct counts', async () => {
    const queue = new TaskQueue(1)
    const task = async () => {
      await setImmediate()
    }

    queue.pushTask(task).pushTask(task)
    await setImmediate()

    assert.deepEqual(queue.stats(), { running: 1, scheduled: 1 })
    await once(queue, 'empty')
    assert.deepEqual(queue.stats(), { running: 0, scheduled: 0 })
  })
})
