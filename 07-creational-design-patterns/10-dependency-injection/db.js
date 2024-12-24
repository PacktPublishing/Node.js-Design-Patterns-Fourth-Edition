import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export function createDb(filename) {
  return open({
    filename,
    driver: sqlite3.Database,
  })
}
