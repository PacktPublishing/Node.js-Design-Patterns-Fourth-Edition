import { readFile, writeFile } from 'node:fs/promises'

export class ConfigTemplate {
  async load(file) {
    console.log(`Deserializing from ${file}`)
    this.data = this._deserialize(await readFile(file, 'utf-8'))
  }

  async save(file) {
    console.log(`Serializing to ${file}`)
    await writeFile(file, this._serialize(this.data))
  }

  _serialize() {
    throw new Error('_serialize() must be implemented')
  }

  _deserialize() {
    throw new Error('_deserialize() must be implemented')
  }
}
