const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = low(adapter);

db.defaults({ userData: [] });

router.get('/', (request, response, next) => {
  response.status(200).render('index', {
    pageTitle: 'Index',
    path: '/index',
    layout: false,
    products: db.get('products'),
    skills: db.get('skills').value(),
    indexStatus: request.flash('indexStatus')
  });
});

router.post('/', (request, response, next) => {
  db.get('userData')
    .push({
      name: request.body.name,
      email: request.body.email,
      message: request.body.message
    })
    .write();
  request.flash('indexStatus', 'Выше сообщение отправлено!');
  response.redirect('/');
});

module.exports = router;
