export class Blog {
  constructor(db) {
    this.db = db
  }

  initialize() {
    const initQuery = `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`

    return this.db.run(initQuery)
  }

  createPost(id, title, content, createdAt) {
    return this.db.run(
      'INSERT INTO posts VALUES (?, ?, ?, ?)',
      id,
      title,
      content,
      createdAt
    )
  }

  getAllPosts() {
    return this.db.all('SELECT * FROM posts ORDER BY created_at DESC')
  }
}
