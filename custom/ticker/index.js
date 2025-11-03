import { EventEmitter } from "node:events";

function ticker(num, cb) {
  const eventEmitter = new EventEmitter();
  const timeout = 50;
  let milliseconds = num;
  let count = 0;

  function tick() {
    const timestamp = Date.now();
    if (timestamp % 5 === 0) {
      const err = new Error("Timestamp is divisible by 5");
      eventEmitter.emit("error", err);
      cb(err);
      return;
    }

    eventEmitter.emit("tick");
    count++;
    milliseconds -= timeout;

    if (milliseconds > 0) {
      setTimeout(tick, timeout);
      return;
    }

    cb(null, count);
  }

  setTimeout(tick);

  return eventEmitter;
}

ticker(1_000, (err, count) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Total number of ticks: ${count}`);
})
  .on("tick", () => {
    console.count("tick");
  })
  .on("error", (err) => {
    console.error(err);
  });
