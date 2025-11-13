import { resolve } from "node:path";
import { listNestedFiles } from "./list-nested-files.js";

const dir = resolve(process.argv[2]);

listNestedFiles(dir, (err, fileNames) => {
  if (err) {
    console.error(err);
    return process.exit(1);
  }

  console.table(fileNames);
});
