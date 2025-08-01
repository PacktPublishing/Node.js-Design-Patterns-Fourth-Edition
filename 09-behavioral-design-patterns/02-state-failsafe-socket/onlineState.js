export class OnlineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket
  }

  send(data) {
    this.failsafeSocket.queue.push(data)
    this._tryFlush()
  }

  async _tryFlush() {
    try {
      let success = true
      while (this.failsafeSocket.queue.length > 0) {
        const data = this.failsafeSocket.queue[0]
        const flushed = await this._tryWrite(data)
        if (flushed) {
          this.failsafeSocket.queue.shift()
        } else {
          success = false
          break
        }
      }
      if (!success) {
        this.failsafeSocket.changeState('offline')
      }
    } catch (err) {
      console.error('Error during flush', err.message)
      this.failsafeSocket.changeState('offline')
    }
  }

  _tryWrite(data) {
    return new Promise(resolve => {
      this.failsafeSocket.socket.write(data, err => {
        if (err) {
          console.error('Error writing data', err.message)
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  activate() {
    this._tryFlush()
  }
}
