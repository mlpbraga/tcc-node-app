const { Router } = require('express');

const newsController = require('../../controllers/news');

const router = new Router({ mergeParams: true });

router.get(
  '/',
  newsController.handleGet,
);

module.exports = router;
