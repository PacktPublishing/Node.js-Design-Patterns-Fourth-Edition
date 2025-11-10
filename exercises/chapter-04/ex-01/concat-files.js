import { createWriteStream, readFile, WriteStream } from "node:fs";
import { join } from "node:path";

/**
 *
 * @param {number} index Current array index
 * @param {Array<string>} arr Array of file paths
 * @param {WriteStream} stream WriteStream
 * @param {(err: Error?) => void} cb Callback function
 */
function writeChunk(index, arr, stream, cb) {
  if (index === arr.length) {
    return process.nextTick(cb);
  }

  readFile(join(import.meta.dirname, arr[index++]), (err, data) => {
    if (err) {
      return cb(err);
    }

    stream.write(data, (err) => {
      if (err) {
        return cb(err);
      }

      writeChunk(index, arr, stream, cb);
    });
  });
}

/**
 *
 * @param {Array<string>} srcFiles Array of source files
 * @param {string} dest Destination file
 * @param {(err: Error?) => void} cb Callback function
 */
export function concatFiles(srcFiles, dest, cb) {
  const stream = createWriteStream(join(import.meta.dirname, dest));

  writeChunk(0, srcFiles, stream, (err) => {
    if (err) {
      return cb(err);
    }

    stream.close((err) => {
      if (err) {
        return cb(err);
      }

      cb();
    });
  });
}
