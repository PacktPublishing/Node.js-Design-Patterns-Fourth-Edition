// biome-ignore lint: style/noNamespaceImport
const bModule = require("./b");

let loaded = false;
const b = bModule;

loaded = true;

module.exports = {
  loaded,
  b,
};
