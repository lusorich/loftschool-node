const fs = require("fs");
const path = require("path");

let myDir,
  newDir,
  needDelete = false;

//Считываем через аргументы начальную и конечную папки, смотрим надо ли удалять начальную
//создаем конечную папку
process.argv.forEach((arg, index, array) => {
  if (arg === "--default") {
    myDir = array[index + 1];
  } else if (arg === "--target") {
    newDir = array[index + 1];
    if (!isDirExist(newDir)) {
      fs.mkdir(newDir, err => {
        console.log("err");
      });
    }
  } else if (arg === "--delete") {
    needDelete = true;
  }
});

const fileSort = (myDir, newDir) => {
  //читаем переданную директорую
  //проходимся по всем элементам в папке
  fs.readdir(myDir, (err, files) => {
    if (err) {
      console.log("Some error");
    }
    files.forEach(file => {
      let stat = fs.statSync(path.resolve(myDir, file));
      //если элемент файл, создаем директорию по первой букве
      if (stat.isFile()) {
        promise(newDir, file)
          .then((newPath) => {
            if (!isDirExist(newPath)) {
              fs.mkdir(newPath, err => {
                console.log("error");
              });
            }
          })
          .then(() => {
            fs.copyFile(
              path.join(myDir, file),
              path.join(newPath, file),
              err => {
                console.log("error");
              }
            );
          })
          .then(() => {
            if (needDelete) {
              fs.unlink(path.join(myDir, file), err => {
                console.log("some error");
              });
            }
            if (needDelete) {
              fs.rmdir(myDir, err => {
                console.log(err);
              });
            }
          });
      }
      if (stat.isDirectory()) {
        //если элемент это директория, вызываем заново функцию с новым путем
        fileSort(path.join(myDir, file), newDir);
      }
    });
  });
};
//проверка на существование
function isDirExist(path) {
  return fs.existsSync(path);
}

const promise = (newDir, file) => {
  return new Promise((resolve, reject) => {
    let newPath = path.join(newDir, path.basename(file)[0]);
    return newPath;
  });
};

fileSort(myDir, newDir);
