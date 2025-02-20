import { join } from 'node:path'
import { JsonConfig } from './jsonConfig.js'
import { TomlConfig } from './tomlConfig.js'
import { YamlConfig } from './yamlConfig.js'

const SAMPLES = join(import.meta.dirname, 'samples')

const jsonConfig = new JsonConfig()
await jsonConfig.load(join(SAMPLES, 'config.json'))
jsonConfig.data.env.NODE_ENV = 'production'
jsonConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
await jsonConfig.save(join(SAMPLES, 'config_mod.json'))

const yamlConfig = new YamlConfig()
await yamlConfig.load(join(SAMPLES, 'config.yaml'))
yamlConfig.data.env.NODE_ENV = 'production'
yamlConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
await yamlConfig.save(join(SAMPLES, 'config_mod.yaml'))

const tomlConfig = new TomlConfig()
await tomlConfig.load(join(SAMPLES, 'config.toml'))
tomlConfig.data.env.NODE_ENV = 'production'
tomlConfig.data.env.NODE_OPTIONS = '--enable-source-maps'
await tomlConfig.save(join(SAMPLES, 'config_mod.toml'))
