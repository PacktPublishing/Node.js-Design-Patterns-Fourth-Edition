import { setTimeout } from 'node:timers/promises'

const deactivate = Symbol('deactivate')

class InitializedState {
  async query(queryString) {
    // simulate the delay of the query execution
    await setTimeout(100)
    console.log(`Query executed: ${queryString}`)
  }
}

class QueuingState {
  constructor(db) {
    this.db = db
    this.commandsQueue = []
  }

  async query(queryString) {
    console.log(`Request queued: ${queryString}`)
    return new Promise((resolve, reject) => {
      const command = () => {
        db.query(queryString).then(resolve, reject)
      }
      this.commandsQueue.push(command)
    })
  }

  [deactivate]() {
    while (this.commandsQueue.length > 0) {
      const command = this.commandsQueue.shift()
      command()
    }
  }
}

class Database {
  constructor() {
    this.state = new QueuingState(this)
  }

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async query(queryString) {
    return this.state.query(queryString)
  }

  async connect() {
    // simulate the delay of the connection
    await setTimeout(500)
    this.connected = true
    const oldState = this.state
    this.state = new InitializedState(this)
    oldState[deactivate]?.()
  }
}

export const db = new Database()
