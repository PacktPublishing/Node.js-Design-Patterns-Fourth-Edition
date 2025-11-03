const aModule = require("./a");

let loaded = false;
const a = aModule;

loaded = true;

module.exports = {
  loaded,
  a,
};
