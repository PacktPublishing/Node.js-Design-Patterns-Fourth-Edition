"use strict";
let { count, increment, logValue, countObj } = require("./counter.js");

console.log(count);
increment();
console.log(count);
count++;
count++;
console.log(count);
logValue();

console.log("countObj");

console.log(countObj.count);
countObj.increment();
console.log(countObj.count);
countObj.count++;
countObj.count++;
countObj.count++;
console.log(countObj.count);
countObj.increment();
console.log(countObj.count);
countObj.logValue();
