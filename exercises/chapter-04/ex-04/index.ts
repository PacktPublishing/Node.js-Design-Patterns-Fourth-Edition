import { BrokenLinksChecker } from "./broken-link-checker";
import { TaskQueue } from "./task-queue";

const url = process.argv[2];
const depth = Number(process.argv[3]);
const concurrency = Number(process.argv[4]);

const queue = new TaskQueue(concurrency);
const brokenLinksChecker = new BrokenLinksChecker(url, depth, queue);

brokenLinksChecker.check((err, links) => {
  if (err) {
    console.error(err);
    return process.exit(1);
  }

  console.table(links);
});
