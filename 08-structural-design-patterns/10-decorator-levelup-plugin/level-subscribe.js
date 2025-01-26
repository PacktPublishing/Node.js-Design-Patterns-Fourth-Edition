export function levelSubscribe(db) {
  db.subscribe = (pattern, listener) => {
    db.on('write', docs => {
      for (const doc of docs) {
        const match = Object.keys(pattern).every(
          k => pattern[k] === doc.value[k]
        )
        if (match) {
          listener(doc.key, doc.value)
        }
      }
    })
  }

  return db
}
