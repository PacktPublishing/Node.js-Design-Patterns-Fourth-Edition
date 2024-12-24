import { db } from './db.js'

export class Blog {
  initialize() {
    const initQuery = `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`

    return db.run(initQuery)
  }

  createPost(id, title, content, createdAt) {
    return db.run(
      'INSERT INTO posts VALUES (?, ?, ?, ?)',
      id,
      title,
      content,
      createdAt
    )
  }

  getAllPosts() {
    return db.all('SELECT * FROM posts ORDER BY created_at DESC')
  }
}
