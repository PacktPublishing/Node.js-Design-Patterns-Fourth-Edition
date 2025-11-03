import { spider } from "./spider.js";
import { TaskQueue } from "./TaskQueue.js";

const url = process.argv[2];
const maxDepth = Number.parseInt(process.argv[3], 10) || 1;
const concurrency = Number.parseInt(process.argv[4], 10) || 2;

const queue = new TaskQueue(concurrency);
queue.pushTask(() => spider(url, maxDepth, queue));
queue.on("error", console.error);
queue.on("empty", () => {
  console.log("Download complete");
});
