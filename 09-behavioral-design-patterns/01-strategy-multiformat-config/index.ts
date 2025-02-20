import { join } from 'node:path'
import { Config } from './config.ts'
import { jsonStrategy, tomlStrategy, yamlStrategy } from './strategies.ts'

const SAMPLES = join(import.meta.dirname, 'samples')

const jsonConfig = new Config(jsonStrategy)
await jsonConfig.load(join(SAMPLES, 'config.json'))
if (jsonConfig.data?.env) {
  jsonConfig.data.env.NODE_ENV = 'production'
  jsonConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
}
await jsonConfig.save(join(SAMPLES, 'config_mod.json'))

const yamlConfig = new Config(yamlStrategy)
await yamlConfig.load(join(SAMPLES, 'config.yaml'))
if (yamlConfig.data?.env) {
  yamlConfig.data.env.NODE_ENV = 'production'
  yamlConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
}
await yamlConfig.save(join(SAMPLES, 'config_mod.yaml'))

const tomlConfig = new Config(tomlStrategy)
await tomlConfig.load(join(SAMPLES, 'config.toml'))
if (tomlConfig.data?.env) {
  tomlConfig.data.env.NODE_ENV = 'production'
  tomlConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
}
await tomlConfig.save(join(SAMPLES, 'config_mod.toml'))
