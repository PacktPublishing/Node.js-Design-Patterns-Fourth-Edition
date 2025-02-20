import YAML from 'yaml' // v2.7.0
import { ConfigTemplate } from './configTemplate.js'

export class YamlConfig extends ConfigTemplate {
  _deserialize(data) {
    return YAML.parse(data)
  }

  _serialize(data) {
    return YAML.stringify(data)
  }
}
