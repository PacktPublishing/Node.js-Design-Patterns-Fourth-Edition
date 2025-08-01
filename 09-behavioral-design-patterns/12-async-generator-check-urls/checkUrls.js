export class CheckUrls {
  constructor(urls) {
    this.urls = urls
  }

  async *[Symbol.asyncIterator]() {
    for (const url of this.urls) {
      try {
        const checkResult = await fetch(url, {
          method: 'HEAD',
          redirect: 'follow',
          signal: AbortSignal.timeout(5000), // 5 secs timeout
        })
        checkResult.ok
          ? yield `${url} is up, status: ${checkResult.status}`
          : yield `${url} is down, error: ${checkResult.status} ${checkResult.statusText}`
      } catch (err) {
        yield `${url} is down, error: ${err.message}`
      }
    }
  }
}
