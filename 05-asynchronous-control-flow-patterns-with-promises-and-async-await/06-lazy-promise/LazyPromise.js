export class LazyPromise extends Promise {
  #resolve
  #reject
  #executor
  #promise

  constructor(executor) {
    let _resolve
    let _reject
    super((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    this.#resolve = _resolve
    this.#reject = _reject
    this.#executor = executor
    this.#promise = null
  }

  #ensureInit() {
    if (!this.#promise) {
      this.#promise = new Promise(this.#executor)
      this.#promise.then(
        v => this.#resolve(v),
        e => this.#reject(e)
      )
    }
  }

  // biome-ignore lint/suspicious/noThenProperty: re-implementing the Promise interface
  then(onFulfilled, onRejected) {
    this.#ensureInit()
    return this.#promise.then(onFulfilled, onRejected)
  }

  catch(onRejected) {
    this.#ensureInit()
    return this.#promise.catch(onRejected)
  }

  finally(onFinally) {
    this.#ensureInit()
    return this.#promise.finally(onFinally)
  }
}
