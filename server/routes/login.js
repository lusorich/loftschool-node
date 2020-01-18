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
    layout: false,
    loginStatus: request.flash('loginStatus')
  });
});

router.post('/', (request, response, next) => {
  db.get('login')
    .push({
      email: request.body.email,
      password: request.body.password
    })
    .write();
  request.flash('loginStatus', 'Данные для входа добавлены');
  response.redirect('/login');
});

module.exports = router;
