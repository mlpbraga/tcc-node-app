const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./src/middlewares/error-handler');
const { applyMiddlewares } = require('./src/middlewares');

const {
  usersRoute,
  authRoute,
  commentsRoute,
  votesRoute,
} = require('./src/routes');

const app = express();

applyMiddlewares(app);

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   next();
// });

app.user(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api routes
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/comments', commentsRoute);
app.use('/votes', votesRoute);
app.use('/health', (req, res) => (res.status(200).json({ ok: 'working' })));

app.use(errorHandler);

module.exports = app;
