import { concatFiles } from "./concat-files.js";

const srcfiles = process.argv.slice(2);
const destFiles = srcfiles.pop();

concatFiles(srcfiles, destFiles, (err) => {
  if (err) {
    return console.error("An error occurred during concating files");
  }

  console.log("Files has been concatenated");
});
