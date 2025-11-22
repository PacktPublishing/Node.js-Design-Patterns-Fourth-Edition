import { resolve } from "node:path";
import { RecursiveSearch } from "./recursive-find";
import { TaskQueue } from "./task-queue";

const dir = resolve(process.argv[2]);
const keyword = process.argv[3];
const concurrency = Number(process.argv[4]);

const queue = new TaskQueue(concurrency);
const recursiveSearch = new RecursiveSearch(dir, keyword, queue);

recursiveSearch.find((err, fileNames) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.table(fileNames);
});
