const fs = require("fs");
const path = require("path");
const http = require("http");

let myDir,
  newDir,
  needDelete = false,
  interval,
  stopInterval;

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
  } else if (arg === "--setInterval") {
    interval = array[index + 1];
  } else if (arg === "--setIntervalStop") {
    stopInterval = array[index + 1];
  }
});

const server = http.createServer((req, res) => {
  const { method } = req;
  if (method === "GET") {
    let dateStart = new Date();
    console.log(`Начальная дата это ${dateStart}`);
    let int = setInterval(() => {
      let date = new Date();
      console.log(date);
      console.log(date.toUTCString());
    }, interval);
  }
});

server.listen(3030);
