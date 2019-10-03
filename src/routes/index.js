const usersRoute = require('./users');
const authRoute = require('./auth');
const commentsRoute = require('./comments');
const votesRoute = require('./votes');

const routes = {
  usersRoute,
  authRoute,
  commentsRoute,
  votesRoute,
};

module.exports = routes;
