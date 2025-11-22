import { EventEmitter } from "node:events";

export class TaskQueue extends EventEmitter {
  private readonly queue = new Array<Task>();
  private running = 0;

  constructor(private readonly concurrency: number) {
    super();
  }

  public pushTask(task: Task) {
    this.queue.push(task);
    process.nextTick(this.next.bind(this));
    return this;
  }

  public next() {
    if (!this.running && !this.queue.length) {
      return this.emit("empty");
    }

    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task((err) => {
        if (err) {
          this.emit("error", err);
        }
        this.running--;
        process.nextTick(this.next.bind(this));
      });
      this.running++;
    }
  }
}

export type ErrCb = (err?: Error) => void;
type Task = (cb: ErrCb) => void;
