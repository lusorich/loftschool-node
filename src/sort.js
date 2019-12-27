const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readdirAsync = promisify(fs.readdir);
const mkdirAsync = promisify(fs.mkdir);
const unlinkAsync = promisify(fs.unlink);
const copyFileAsync = promisify(fs.copyFile);
const statAsync = promisify(fs.stat);
const rmdirAsync = promisify(fs.rmdir);

let myDir,
  newDir,
  needDelete = false,
  stat,
  file2,
  b;

process.argv.forEach((arg, index, array) => {
  if (arg === "--default") {
    myDir = array[index + 1];
  } else if (arg === "--target") {
    newDir = array[index + 1];
    if (!isDirExist(newDir)) {
      fs.mkdirSync(newDir);
    }
  } else if (arg === "--delete") {
    needDelete = true;
  }
});
async function fileSort(myDir, newDir) {
  const dir = await readdirAsync(myDir);
  for (let file of dir) {
    let newPath = path.join(newDir, path.basename(file)[0]);
    let stat = await statAsync(path.resolve(myDir, file));
    if (stat.isFile()) {
      if (!isDirExist(newPath)) {
        await mkdirAsync(newPath);
      }
      await copyFileAsync(path.join(myDir, file), path.join(newPath, file));
      if (needDelete) {
        await unlinkAsync(path.join(myDir, file));
      }
    }
    if (stat.isDirectory()) {
      await fileSort(path.join(myDir, file), newDir);
    }
  }
  if (needDelete) {
    rmdirAsync(myDir);
  }
}

function isDirExist(path) {
  return fs.existsSync(path);
}

fileSort(myDir, newDir);
