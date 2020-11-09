const usersRoute = require('./users');
const authRoute = require('./auth');
const commentsRoute = require('./comments');
const votesRoute = require('./votes');
const metricsRoute = require('./metrics');
const newsRoute = require('./news');

const routes = {
  usersRoute,
  authRoute,
  commentsRoute,
  votesRoute,
  metricsRoute,
  newsRoute,
};

module.exports = routes;
