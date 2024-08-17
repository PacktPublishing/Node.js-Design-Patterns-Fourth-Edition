// biome-ignore lint/style/noNamespaceImport: needs namespace import for simplicity
import * as aModule from './a.js'

export let loaded = false
export const a = aModule

loaded = true
