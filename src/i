const fs = require("fs");
const path = require("path");

const myDir = "C:/loftschool-node/src/music";

fs.readdir(myDir, (err, files) => {
  if (err) {
    console.log("FUCKING ERROR");
  }

  files.forEach(file => {
    console.log(file);
    console.log(path.basename(file));
    let stat = fs.statSync(path.resolve(myDir, file));

    if (stat.isFile() === true) {
      fs.link(path.resolve(myDir, file), "C:/loftschool-node/src/music/hey.mp3", err => {
        if (err.code === "EEXIST") {
          return "File exist";
        }
        console.log(err);
      });
    }
  });
});
