import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export class DbClient {
  #dbPath
  #db

  constructor(dbPath) {
    this.#dbPath = dbPath
    this.#db = null
  }

  async #connect() {
    if (this.#db) {
      return this.#db
    }

    this.#db = await open({
      filename: this.#dbPath,
      driver: sqlite3.Database,
    })

    return this.#db
  }

  async query(sql, params = {}) {
    const db = await this.#connect()
    return db.all(sql, params)
  }

  async close() {
    if (this.#db) {
      await this.#db.close()
      this.#db = null
    }
  }
}
