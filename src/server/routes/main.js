const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  response.status(200).render('index', {
    pageTitle: 'Index',
    path: '/index',
    layout: false
  });
});

router.post('/', (request, response, next) => {
  console.log(request.body);
});

module.exports = router;
