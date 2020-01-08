const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  response.status(200).render('login', {
    pageTitle: 'Login',
    path: '/login',
    layout: false
  });
});

router.post('/login', (request, response, next) => {
  console.log(request.body);
});

module.exports = router;
