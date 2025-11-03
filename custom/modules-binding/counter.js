"use strict";
let count = 0;

function increment() {
  count++;
}

function logValue() {
  console.log(count);
}

const countObj = {
  count: 0,
  increment() {
    this.count++;
  },
  logValue() {
    console.log(this.count);
  },
};

module.exports = { count, increment, logValue, countObj };
