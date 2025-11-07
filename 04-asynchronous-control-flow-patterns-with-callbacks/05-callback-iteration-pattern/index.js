const tasks = [
  (cb) => {
    console.log("Task 1");
    setTimeout(cb, 1000);
  },
  (cb) => {
    console.log("Task 2");
    setTimeout(cb, 1000);
  },
  (cb) => {
    console.log("Task 3");
    setTimeout(cb, 1000);
  },
];

function iterate(index, tasks, finalCallback) {
  if (index === tasks.length) {
    return finalCallback();
  }
  const task = tasks[index];
  task(() => iterate(index + 1, tasks, finalCallback));
}

function finish() {
  // iteration completed
  console.log("All tasks executed");
}

function iterateSeries(collection, iteratorCallback, finalCallback) {
  iteratorCallback(0, collection, finalCallback);
}

iterateSeries(tasks, iterate, finish);
