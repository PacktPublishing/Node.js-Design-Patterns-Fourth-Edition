import { setTimeout } from 'node:timers/promises'

class Database {
  connected = false

  async connect() {
    if (!this.connected) {
      // simulate the delay of the connection
      await setTimeout(500)
      this.connected = true
    }
  }

  async query(queryString) {
    if (!this.connected) {
      throw new Error('Not connected yet')
    }
    // simulate the delay of the query execution
    await setTimeout(100)
    console.log(`Query executed: ${queryString}`)
  }
}

export const db = new Database()
