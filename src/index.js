const fs = require("fs");
const path = require("path");

let myDir,
  newDir,
  needDelete = false,
  dirArray = [];

//Считываем через аргументы начальную и конечную папки, смотрим надо ли удалять начальную
//создаем конечную папку
process.argv.forEach((arg, index, array) => {
  if (arg === "--default") {
    myDir = array[index + 1];
    dirArray.push(myDir);
  } else if (arg === "--target") {
    newDir = array[index + 1];
    fs.mkdir(newDir, err => {
      console.log(err);
    });
  } else if (arg === "--delete") {
    needDelete = true;
  }
});

const fileSort = (myDir, newDir, dirArray) => {
  //читаем переданную директорую
  fs.readdir(myDir, (err, files) => {
    if (err) {
      console.log("ERROR, MY FRIEND");
    }
    //проходимся по всем элементам в папке
    files.forEach(file => {
      let stat = fs.statSync(path.resolve(myDir, file));
      //если элемент файл, создаем директорию по первой букве
      if (stat.isFile() === true) {
        let newPath = path.join(newDir, path.basename(file)[0]);
        fs.mkdir(newPath, err => {
          console.log(err);
          //копируем файл в новую директорию
          fs.copyFile(path.join(myDir, file), path.join(newPath, file), err => {
            //если есть флаг delete, после копирования сразу удаляем файл
            if (needDelete) {
              fs.unlink(path.join(myDir, file), err => {
                console.log(err);
              });
            }
          });
        });
      }
      if (stat.isDirectory() === true) {
        //если стоит флаг delete, то формируем массив со всеми папками, проверяем чтобы папки не дублировались
        //на случай если в 1й папке несколько файлов
        if (needDelete && dirArray.includes(path.join(myDir, file)) === false) {
          dirArray.push(path.join(myDir, file));
        }
        //если элемент это директория, вызываем заново функцию с новым путем
        fileSort(path.join(myDir, file), newDir, dirArray);
      }
    });
  });
  if (needDelete) {
    setTimeout(() => delDir(dirArray), 5000);
  }
};
//удаление всех каталогов, которые занесены в массив
function delDir(dirArray) {
  for (let i = dirArray.length - 1; i >= 0; i--) {
    fs.rmdirSync(dirArray[i]);
  }
}

fileSort(myDir, newDir, dirArray);
