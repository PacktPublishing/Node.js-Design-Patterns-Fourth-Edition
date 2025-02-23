// The Invoker
export class Invoker {
  #history = []

  run(cmd) {
    this.#history.push(cmd)
    cmd.run()
    console.log('Command executed', cmd.serialize())
  }

  delay(cmd, delay) {
    setTimeout(() => {
      console.log('Executing delayed command', cmd.serialize())
      this.run(cmd)
    }, delay)
  }

  undo() {
    const cmd = this.#history.pop()
    if (cmd) {
      cmd.undo()
      console.log('Command undone', cmd.serialize())
    }
  }

  async runRemotely(cmd) {
    await fetch('http://localhost:3000/cmd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd.serialize()),
    })

    console.log('Command executed remotely', cmd.serialize())
  }
}
