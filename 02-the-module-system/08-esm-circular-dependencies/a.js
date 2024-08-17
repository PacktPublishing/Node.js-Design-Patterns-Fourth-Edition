// biome-ignore lint/style/noNamespaceImport: needs namespace import for simplicity
import * as bModule from './b.js'

export let loaded = false
export const b = bModule

loaded = true
