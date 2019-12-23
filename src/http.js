const http = require("http");

let setIntervalStart, setIntervalStop;

process.argv.forEach((arg, index, array) => {
  if (arg === "--setInterval") {
    setIntervalStart = array[index + 1];
  } else if (arg === "--setIntervalStop") {
    setIntervalStop = array[index + 1];
  }
});

const server = http.createServer((req, res) => {
  const { method } = req;
  if (method === "GET") {
    promise(res);
  }
});

const promise = res => {
  return new Promise((resolve, reject) => {
    let dateStart = new Date();
    console.log(`Начальная дата это ${dateStart}`);
    let int = setInterval(() => {
      let date = new Date();
      console.log(date.toUTCString());
    }, setIntervalStart);
    setTimeout(() => {
      clearInterval(int);
      console.log(`Конец ${new Date().toUTCString()}`);
      resolve(res.end());
    }, setIntervalStop);
  });
};

server.listen(3030);
