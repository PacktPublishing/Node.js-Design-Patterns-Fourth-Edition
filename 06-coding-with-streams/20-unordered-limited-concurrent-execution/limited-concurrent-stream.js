import { Transform } from 'node:stream'

export class LimitedConcurrentStream extends Transform {
  constructor(concurrency, userTransform, opts) {
    super({ objectMode: true, ...opts })
    this.concurrency = concurrency
    this.userTransform = userTransform
    this.running = 0
    this.continueCb = null
    this.terminateCb = null
  }

  _transform(chunk, enc, done) {
    this.running++
    const maybePromise = this.userTransform(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    )

    if (maybePromise && typeof maybePromise.then === 'function') {
      maybePromise.catch(err => this.emit('error', err))
    }

    if (this.running < this.concurrency) {
      done()
    } else {
      this.continueCb = done
    }
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
    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb?.()
    if (this.running === 0) {
      this.terminateCb?.()
    }
  }
}
