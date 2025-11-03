import { readFile } from "node:fs";

const cache = new Map();

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // invoked synchronously
    cb(cache.get(filename));
  } else {
    // asynchronous function
    readFile(filename, "utf8", (_err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, (value) => {
    for (const listener of listeners) {
      listener(value);
    }
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}

// this makes sure that the `data.txt` file is relative to
// this JS file (and not the current working directory)
const filePath = new URL("data.txt", import.meta.url);

const reader1 = createFileReader(filePath);
reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`);

  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader(filePath);
  reader2.onDataReady((data) => {
    // this won't print because the data has been cached
    // and the previous call to `createFileReader`
    // has already invoked the callback before we have
    // the chance to add a new listener
    console.log(`Second call data: ${data}`);
  });
});
