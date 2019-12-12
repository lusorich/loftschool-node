const fs = require("fs");
const path = require("path");

let myDir = "C:/loftschool-node/src/music";
let newDir = "C:/loftschool-node/src/sorted";

const funcRec = (myDir, newDir) => {
  fs.readdir(myDir, (err, files) => {
    if (err) {
      console.log('FUCKING ERROR, MY FRIEND');
    }

<<<<<<< HEAD
    files.forEach(file => {
      let stat = fs.statSync(path.resolve(myDir, file));
=======
  files.forEach(file => {
    console.log(path.basename(file)[0]);
    let stat = fs.statSync(path.resolve(myDir, file));
>>>>>>> a1a5feddbe77299fcd1d3a6496213db87a8c6f95

      if (stat.isFile() === true) {
        console.log(`file is ${file}`);
        fs.copyFile(path.join(myDir, file), path.join(newDir, file), err => {console.log(err)})
      }
      if (stat.isDirectory() === true) {
        console.log(`directory is ${file}`);

        myDirInner = path.join(myDir, file);
        funcRec(myDirInner, newDir)
      }
    });
  });
};

funcRec(myDir, newDir);