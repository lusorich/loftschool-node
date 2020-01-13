const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('admin.json');
const db = low(adapter);

db.defaults({ desc: [], skills: [] }).write();

router.get('/', (request, response, next) => {
  response.status(200).render('admin', {
    pageTitle: 'Admin',
    path: '/admin',
    layout: false
  });
});

router.post('/skills', (request, response, next) => {
  let reqToJson = JSON.stringify(request.body);

  db.get('skills')
    .push({
      age: JSON.parse(reqToJson).age,
      concerts: JSON.parse(reqToJson).concerts,
      cities: JSON.parse(reqToJson).cities,
      years: JSON.parse(reqToJson).years
    })
    .write();
  response.end();
});

router.post('/upload', (request, response, next) => {

  console.log(request.files);
  
  let reqToJson = JSON.stringify(request.body);

  db.get('desc')
    .push({
      name: JSON.parse(reqToJson).name,
      price: JSON.parse(reqToJson).price
    })
    .write();
  response.end();
});

module.exports = router;
