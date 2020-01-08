const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  response.status(200).render('admin', {
    pageTitle: 'Admin',
    path: '/admin',
    layout: false
  });
});

router.post('/upload', (request, response, next) => {
  console.log(request.body);
});

router.post('/skills', (request, response, next) => {
  console.log(request.body);
});

module.exports = router;
