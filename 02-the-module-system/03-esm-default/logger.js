// biome-ignore lint/style/noDefaultExport: demonstrating default export syntax
export default class Logger {
  constructor(name) {
    this.name = name
  }

  log(message) {
    console.log(`[${this.name}] ${message}`)
  }
}
