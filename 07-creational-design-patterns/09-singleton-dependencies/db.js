import { join } from 'node:path'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export const db = await open({
  filename: join(import.meta.dirname, 'data.sqlite'),
  driver: sqlite3.Database,
})
