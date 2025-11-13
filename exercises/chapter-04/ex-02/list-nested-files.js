import { readdir, stat } from "node:fs";
import { join } from "node:path";

export function listNestedFiles(path, cb) {
  readdir(path, (err, files) => {
    if (err) {
      return cb(err);
    }

    getFileNames(0, files, path, [], cb);
  });
}

function getFileNames(index, files, path, fileNames, cb) {
  if (index === files.length) {
    return process.nextTick(cb, null, fileNames);
  }

  const currPath = join(path, files[index]);

  stat(currPath, (err, stats) => {
    if (err) {
      return cb(err);
    }

    if (stats.isDirectory()) {
      return iterateNestedDir(currPath, index, files, path, fileNames, cb);
    }

    fileNames.push(currPath);

    getFileNames(index + 1, files, path, fileNames, cb);
  });
}

function iterateNestedDir(currPath, index, files, path, fileNames, cb) {
  listNestedFiles(currPath, (err, nestedFiles) => {
    if (err) {
      return cb(err);
    }

    fileNames.push(...nestedFiles);
    getFileNames(index + 1, files, path, fileNames, cb);
  });
}
