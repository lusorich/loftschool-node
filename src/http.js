const http = require("http");

let setIntervalStart, setIntervalStop;

process.argv.forEach((arg, index, array) => {
  if (arg === "--setIntervalStart") {
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
    console.log(`Начало ${new Date().toUTCString()}`);
    let startDate = (new Date().getTime() + Number(setIntervalStart));
    let endDate = ((startDate + Number(setIntervalStop))/1000).toFixed(1);
    let int = setInterval(() => {
      console.log(`В интервале ${new Date().toUTCString()}`);
      if ( ((new Date().getTime())/1000).toFixed(1) === endDate) {
        clearInterval(int);
        resolve(res.end(`Конец ${new Date().toUTCString()}`));
      }
    }, setIntervalStart);
  });
};

server.listen(3030);
