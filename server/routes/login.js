const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('login.json');
const db = low(adapter);

db.defaults({ login: [] }).write();

router.get('/', (request, response, next) => {
  response.status(200).render('login', {
    pageTitle: 'Login',
    path: '/login',
    layout: false
  });
});

router.post('/', (request, response, next) => {
  let reqToJson = JSON.stringify(request.body);
  db.get('login')
    .push({
      email: JSON.parse(reqToJson).email,
      password: JSON.parse(reqToJson).password
    })
    .write();
  response.end();
});

module.exports = router;
