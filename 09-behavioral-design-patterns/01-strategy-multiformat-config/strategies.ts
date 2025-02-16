import TOML from 'smol-toml' // v1.3.1
import YAML from 'yaml' // v2.7.0
import type { ConfigData } from './configData.ts'

export type FormatStrategy = {
  deserialize: (data: string) => ConfigData
  serialize: (data: ConfigData) => string
}

export const jsonStrategy: FormatStrategy = {
  deserialize(data): ConfigData {
    return JSON.parse(data)
  },
  serialize(data: ConfigData): string {
    return JSON.stringify(data, null, 2)
  },
}

export const yamlStrategy: FormatStrategy = {
  deserialize(data): ConfigData {
    return YAML.parse(data)
  },
  serialize(data: ConfigData): string {
    return YAML.stringify(data, { indent: 2 })
  },
}

export const tomlStrategy: FormatStrategy = {
  deserialize(data): ConfigData {
    return TOML.parse(data) as ConfigData
  },
  serialize(data: ConfigData): string {
    return TOML.stringify(data)
  },
}
