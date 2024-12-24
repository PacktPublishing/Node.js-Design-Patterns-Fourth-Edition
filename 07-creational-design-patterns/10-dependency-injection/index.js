import { join } from 'node:path'
import { Blog } from './blog.js'
import { createDb } from './db.js'

const db = await createDb(join(import.meta.dirname, 'data.sqlite'))
const blog = new Blog(db)
await blog.initialize()
const posts = await blog.getAllPosts()
if (posts.length === 0) {
  console.log(
    'No post available. Run `node import-posts.js`' +
      ' to load some sample posts'
  )
}

for (const post of posts) {
  console.log(post.title)
  console.log('-'.repeat(post.title.length))
  console.log(`Published on ${new Date(post.created_at).toISOString()}`)
  console.log(post.content)
}
