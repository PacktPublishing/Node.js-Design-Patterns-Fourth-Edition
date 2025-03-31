import { access, mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function saveConfig(path, config) {
  const folder = dirname(path)

  try {
    await access(folder)
  } catch {
    await mkdir(folder, { recursive: true })
  }

  const json = JSON.stringify(config, null, 2)
  await writeFile(path, json, 'utf-8')
}
