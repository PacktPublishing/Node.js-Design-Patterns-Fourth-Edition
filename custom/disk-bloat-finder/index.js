import { readdir, stat } from "node:fs";
import { join } from "node:path";

function diskBloatFinder(path, cb) {
  console.log(`Looking for largest file in directory: ${path}`);

  readdir(path, { recursive: true }, (err, files) => {
    if (err) {
      return cb(err);
    }

    const largestFile = {
      path: "",
      size: 0,
    };

    let filesCount = files.length;
    let errorOccured = false;

    for (const file of files) {
      const filePath = join(path, file);

      stat(filePath, (err, stats) => {
        filesCount--;

        if (errorOccured) {
          return;
        }

        if (err) {
          errorOccured = true;
          return cb(err);
        }

        if (stats.isFile() && stats.size > largestFile.size) {
          largestFile.size = stats.size;
          largestFile.path = filePath;
        }

        if (!filesCount) {
          cb(null, largestFile);
        }
      });
    }
  });
}

diskBloatFinder(join(import.meta.dirname, "..", ".."), (err, file) => {
  if (err) {
    console.error(err);
    return;
  }

  console.table(file);
});
