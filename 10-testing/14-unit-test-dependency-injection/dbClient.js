export class DbClient {
  // biome-ignore lint/suspicious/useAwait: just for demonstration
  async query(_sql, _params) {
    // In real life, this would talk to a database
    throw new Error('Not implemented')
  }
}
