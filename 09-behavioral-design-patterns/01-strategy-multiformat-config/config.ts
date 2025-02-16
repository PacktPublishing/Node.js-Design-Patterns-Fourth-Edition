import { readFile, writeFile } from 'node:fs/promises'
import type { ConfigData } from './configData.ts'
import type { FormatStrategy } from './strategies.ts'

export class Config {
  data?: ConfigData
  formatStrategy: FormatStrategy

  constructor(formatStrategy: FormatStrategy) {
    this.data = undefined
    this.formatStrategy = formatStrategy
  }

  async load(filePath: string): Promise<void> {
    console.log(`Deserializing from ${filePath}`)
    this.data = this.formatStrategy.deserialize(
      await readFile(filePath, 'utf-8')
    )
  }

  async save(filePath: string): Promise<void> {
    if (!this.data) {
      throw new Error('No data to save')
    }

    console.log(`Serializing to ${filePath}`)
    await writeFile(filePath, this.formatStrategy.serialize(this.data))
  }
}
