// saveConfig.test.js
import assert from 'node:assert/strict'
import { mock, suite, test } from 'node:test'
import { setImmediate } from 'node:timers/promises'

// NOTE: concurrency: false is important here!
suite('saveConfig', { concurrency: false, timeout: 500 }, () => {
  test('Creates folder (if needed)', async t => {
    const mockMkdir = mock.fn()
    const mockAccess = mock.fn(async _path => {
      await setImmediate()
      throw new Error('ENOENT')
    })
    t.mock.module('node:fs/promises', {
      cache: false,
      namedExports: {
        access: mockAccess,
        mkdir: mockMkdir,
        writeFile: mock.fn(),
      },
    })

    const { saveConfig } = await import('./saveConfig.js')
    await saveConfig('./path/to/configs/app.json', { port: 3000 })

    assert.equal(mockMkdir.mock.callCount(), 1)
  })

  test('Does not create folder (if exists)', async t => {
    const mockMkdir = mock.fn()
    const mockAccess = mock.fn(async _path => {
      await setImmediate()
    })
    t.mock.module('node:fs/promises', {
      cache: false,
      namedExports: {
        access: mockAccess,
        mkdir: mockMkdir,
        writeFile: mock.fn(),
      },
    })

    const { saveConfig } = await import('./saveConfig.js')
    await saveConfig('./path/to/configs/app.json', { port: 3000 })

    assert.equal(mockMkdir.mock.callCount(), 0)
  })
})
