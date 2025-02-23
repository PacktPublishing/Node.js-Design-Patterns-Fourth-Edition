export class CheckUrls {
  #urls

  constructor(urls) {
    this.#urls = urls
  }

  [Symbol.asyncIterator]() {
    const urlsIterator = Iterator.from(this.#urls)

    return {
      async next() {
        const iteratorResult = urlsIterator.next()
        if (iteratorResult.done) {
          return { done: true }
        }

        const url = iteratorResult.value
        try {
          const checkResult = await fetch(url, {
            method: 'HEAD',
            redirect: 'follow',
            signal: AbortSignal.timeout(5000), // 5 secs timeout
          })
          if (!checkResult.ok) {
            return {
              done: false,
              value: `${url} is down, error: ${checkResult.status} ${checkResult.statusText}`,
            }
          }
          return {
            done: false,
            value: `${url} is up, status: ${checkResult.status}`,
          }
        } catch (err) {
          return {
            done: false,
            value: `${url} is down, error: ${err.message}`,
          }
        }
      },
    }
  }
}
