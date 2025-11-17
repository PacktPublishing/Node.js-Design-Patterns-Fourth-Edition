import { readdir, stat } from "node:fs";
import { join } from "node:path";

export function listNestedFiles(path, cb) {
  getFileNames(path, [], cb);
}

function getFileNames(path, names, cb) {
  readdir(path, (err, files) => {
    if (err) {
      return cb(err);
    }

    iterate(0, files, path, names, cb);
  });
}

function iterate(index, files, path, names, cb) {
  if (index === files.length) {
    return process.nextTick(cb, null, names);
  }

  const currPath = join(path, files[index]);

  stat(currPath, (err, stats) => {
    if (err) {
      return cb(err);
    }

    if (stats.isFile()) {
      names.push(currPath);
      return iterate(index + 1, files, path, names, cb);
    }

    getFileNames(currPath, names, (err) => {
      if (err) {
        return cb(err);
      }

      iterate(index + 1, files, path, names, cb);
    });
  });
}
