import { EventEmitter } from "node:events";
import { createWriteStream } from "node:fs";
import { get } from "node:https";

function downloadToFile(url, file, cb) {
  const eventEmitter = new EventEmitter();
  const fileStream = createWriteStream(file);

  const req = get(url, (resp) => {
    let downloadedBytes = 0;
    const fileSize = Number.parseInt(resp.headers["content-length"], 10);
    resp
      .on("error", (err) => {
        cb(err);
      })
      .on("data", (chunk) => {
        fileStream.write(chunk);
        downloadedBytes += chunk.length;
        eventEmitter.emit("progress", downloadedBytes, fileSize);
      })
      .on("end", () => {
        fileStream.close();
        cb(null, file);
      });
  });

  req.on("error", (err) => {
    cb(err);
  });

  return eventEmitter;
}

downloadToFile(
  "https://nodejsdesignpatterns.com/_astro/book-cover.IlaUYuAk_Z2lJses.avif",
  new URL("book-cover.avif", import.meta.url),
  (err, { href }) => {
    if (err) {
      return console.error(`Download failed: ${err.message}`);
    }
    console.log("Download completed, new file path: ", href);
  },
).on("progress", (downloaded, total) => {
  console.log(
    `${downloaded}/${total} (${((downloaded / total) * 100).toFixed(2)}%)`,
  );
});
