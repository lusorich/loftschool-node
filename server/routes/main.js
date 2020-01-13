const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('index.json');
const db = low(adapter);

db.defaults({ userData: [] }).write();

router.get('/', (request, response, next) => {
  response.status(200).render('index', {
    pageTitle: 'Index',
    path: '/index',
    layout: false
  });
});

router.post('/', (request, response, next) => {
  let reqToJson = JSON.stringify(request.body);
  db.get('userData')
    .push({
      name: JSON.parse(reqToJson).name,
      email: JSON.parse(reqToJson).email,
      message: JSON.parse(reqToJson).message
    })
    .write();
  response.end();
});

module.exports = router;
