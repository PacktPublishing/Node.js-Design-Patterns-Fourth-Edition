import { readdir, readFile, stat } from "node:fs";
import { join } from "node:path";
import { ErrCb, TaskQueue } from "./task-queue";

export class RecursiveSearch {
  private readonly fileNames = new Array<string>();

  constructor(
    private readonly dir: string,
    private readonly keyword: string,
    private readonly queue: TaskQueue,
  ) {}

  public find(cb: (err: Error | null, fileNames?: Array<string>) => void) {
    this.queue.on("error", (err) => cb(err));
    this.queue.on("empty", () => cb(null, this.fileNames));
    this.queue.pushTask((queueCb) => {
      this.getFiles(this.dir, queueCb);
    });
  }

  private getFiles(dir: string, cb: ErrCb) {
    readdir(dir, (err, files) => {
      if (err) {
        return cb(err);
      }

      for (const file of files) {
        this.queue.pushTask((queueCb) => {
          this.checkFileType(join(dir, file), queueCb);
        });
      }

      cb();
    });
  }

  private checkFileType(path: string, cb: ErrCb) {
    stat(path, (err, stats) => {
      if (err) {
        return cb(err);
      }

      if (stats.isDirectory()) {
        this.queue.pushTask((queueCb) => {
          this.getFiles(path, queueCb);
        });
      } else {
        this.queue.pushTask((queueCb) => {
          this.findKeyword(path, queueCb);
        });
      }

      cb();
    });
  }

  private findKeyword(path: string, cb: ErrCb) {
    readFile(path, "utf-8", (err, data) => {
      if (err) {
        return cb(err);
      }

      if (data.includes(this.keyword)) {
        this.fileNames.push(path);
      }

      cb();
    });
  }
}
