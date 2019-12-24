const fs = require("fs");
const path = require("path");

let myDir,
  newDir,
  needDelete = false;

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
  const syncDir = fs.readdirSync(myDir);
  let fin = await new Promise((resolve, reject) => {
    resolve(
      syncDir.forEach(file => {
        let stat = fs.statSync(path.resolve(myDir, file));
        if (stat.isFile()) {
          promise(newDir, file)
            .then(newPath => {
              if (!isDirExist(newPath)) {
                fs.mkdirSync(newPath);
              }
              return newPath;
            })
            .then(newPath => {
              fs.copyFileSync(path.join(myDir, file), path.join(newPath, file));
            })
            .then(() => {
              if (needDelete) {
                fs.unlinkSync(path.join(myDir, file));
              }
            });
        }
        if (stat.isDirectory()) {
          fileSort(path.join(myDir, file), newDir);
        }
      })
    )
  }).then(() => true);
  if (needDelete && fin) {
      fs.rmdirSync(myDir);
  }
}

function isDirExist(path) {
  return fs.existsSync(path);
}

const promise = (newDir, file) => {
  return new Promise((resolve, reject) => {
    let newPath = path.join(newDir, path.basename(file)[0]);
    resolve(newPath);
  });
};

fileSort(myDir, newDir);
