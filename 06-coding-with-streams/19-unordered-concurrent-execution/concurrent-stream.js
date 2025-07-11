import { Transform } from 'node:stream'

export class ConcurrentStream extends Transform {
  constructor(userTransform, opts) {
    super({ objectMode: true, ...opts })
    this.userTransform = userTransform
    this.running = 0
    this.terminateCb = null
  }

  _transform(chunk, enc, done) {
    this.running++
    this.userTransform(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    )
    done()
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCb = done
    } else {
      done()
    }
  }

  _onComplete(err) {
    this.running--
    if (err) {
      return this.emit('error', err)
    }
    if (this.running === 0) {
      this.terminateCb?.()
    }
  }
}
