import TOML from 'smol-toml' // v1.3.1
import { ConfigTemplate } from './configTemplate.js'

export class TomlConfig extends ConfigTemplate {
  _deserialize(data) {
    return TOML.parse(data)
  }

  _serialize(data) {
    return TOML.stringify(data)
  }
}
