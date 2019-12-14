const fs = require("fs");
const path = require("path");

let myDir,
  newDir,
  needDelete = false,
  dirArray = [];

process.argv.forEach((arg, index, array) => {
  if (arg === "--default") {
    myDir = array[index + 1];
    dirArray.push(myDir);
  } else if (arg === "--target") {
    newDir = array[index + 1];
  } else if (arg === "--delete") {
    needDelete = true;
  }
});

const funcRec = (myDir, newDir, dirArray) => {
  fs.readdir(myDir, (err, files) => {
    if (err) {
      console.log("ERROR, MY FRIEND");
    }

    files.forEach(file => {
      let stat = fs.statSync(path.resolve(myDir, file));

      if (stat.isFile() === true) {
        let newPath = path.join(newDir, path.basename(file)[0]);
        fs.mkdir(newPath, err => {
          if (err.code === "EEXIST") {
            console.log("Данная папка уже существует");
          } else {
            console.log(err);
          }
          fs.copyFile(path.join(myDir, file), path.join(newPath, file), err => {
            if (needDelete) {
              fs.unlink(path.join(myDir, file), err => {
                console.log(err);
              });
            }
          });
        });
      }
      if (stat.isDirectory() === true) {
        if (needDelete && dirArray.includes(path.join(myDir, file)) === false) {
          dirArray.push(path.join(myDir, file));
        }
        funcRec(path.join(myDir, file), newDir, dirArray);
      }
    });
  });
  console.log(dirArray);
  setTimeout(() => delDir(dirArray), 5000);
};

function delDir(dirArray) {
  for (let i = dirArray.length - 1; i >= 0; i--) {
    fs.rmdirSync(dirArray[i]);
  }
}

funcRec(myDir, newDir, dirArray);
