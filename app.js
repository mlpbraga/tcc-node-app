const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./src/middlewares/error-handler');
const { applyMiddlewares } = require('./src/middlewares');

const {
  usersRoute,
  authRoute,
} = require('./src/routes');

const app = express();

applyMiddlewares(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api routes
app.use('/users', usersRoute);
app.use('/auth', authRoute);

app.use(errorHandler);

module.exports = app;
