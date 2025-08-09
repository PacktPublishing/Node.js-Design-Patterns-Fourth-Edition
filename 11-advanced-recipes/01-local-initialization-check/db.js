import { setTimeout } from 'node:timers/promises'

class Database {
  connected = false
  #pendingConnection = null

  async connect() {
    if (!this.connected) {
      if (this.#pendingConnection) {
        return this.#pendingConnection
      }
      // simulate the delay of the connection
      this.#pendingConnection = setTimeout(500)
      await this.#pendingConnection
      this.connected = true
      this.#pendingConnection = null
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
