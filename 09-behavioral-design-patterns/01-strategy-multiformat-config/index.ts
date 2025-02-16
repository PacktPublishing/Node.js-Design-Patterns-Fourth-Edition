import { Config } from './config.ts'
import { jsonStrategy, tomlStrategy, yamlStrategy } from './strategies.ts'

const jsonConfig = new Config(jsonStrategy)
await jsonConfig.load('samples/config.json')
if (jsonConfig.data?.env) {
  jsonConfig.data.env.NODE_ENV = 'production'
  jsonConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
}
await jsonConfig.save('samples/config_mod.json')

const yamlConfig = new Config(yamlStrategy)
await yamlConfig.load('samples/config.yaml')
if (yamlConfig.data?.env) {
  yamlConfig.data.env.NODE_ENV = 'production'
  yamlConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
}
await yamlConfig.save('samples/config_mod.yaml')

const tomlConfig = new Config(tomlStrategy)
await tomlConfig.load('samples/config.toml')
if (tomlConfig.data?.env) {
  tomlConfig.data.env.NODE_ENV = 'production'
  tomlConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
}
await tomlConfig.save('samples/config_mod.toml')
