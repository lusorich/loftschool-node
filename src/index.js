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
      fs.mkdirSync(newDir);
    }
  } else if (arg === "--delete") {
    needDelete = true;
  }
});

const fileSort = (myDir, newDir) => {
  //читаем переданную директорую

  const syncDir = fs.readdirSync(myDir);
  //проходимся по всем элементам в папке
  syncDir.forEach(file => {
    let stat = fs.statSync(path.resolve(myDir, file));
    //если элемент файл, создаем директорию по первой букве
    if (stat.isFile()) {
      let newPath = path.join(newDir, path.basename(file)[0]);
      if (!isDirExist(newPath)) {
        fs.mkdirSync(newPath);
      }
      //копируем файл в новую директорию
      fs.copyFileSync(path.join(myDir, file), path.join(newPath, file));
      //если есть флаг delete, после копирования сразу удаляем файл
      if (needDelete) {
        fs.unlinkSync(path.join(myDir, file));
      }
    }
    if (stat.isDirectory()) {
      //если элемент это директория, вызываем заново функцию с новым путем
      fileSort(path.join(myDir, file), newDir);
    }
  });
  if (needDelete) {
    console.log(myDir);
    fs.rmdirSync(myDir);
  }
};
//проверка на существование
function isDirExist(path) {
  return fs.existsSync(path);
}

fileSort(myDir, newDir);
