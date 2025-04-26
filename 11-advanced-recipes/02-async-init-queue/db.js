import { setTimeout } from 'node:timers/promises'

class Database {
  connected = false
  commandsQueue = []

  async connect() {
    // simulate the delay of the connection
    await setTimeout(500)
    this.connected = true
    while (this.commandsQueue.length > 0) {
      const command = this.commandsQueue.shift()
      command()
    }
  }

  async query(queryString) {
    if (!this.connected) {
      console.log(`Request queued: ${queryString}`)

      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString).then(resolve, reject)
        }
        this.commandsQueue.push(command)
      })
    }

    // simulate the delay of the query execution
    await setTimeout(100)
    console.log(`Query executed: ${queryString}`)
  }
}

export const db = new Database()
