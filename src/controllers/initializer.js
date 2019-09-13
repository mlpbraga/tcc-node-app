const logger = require('../utils/logger');
const { db, models } = require('../models');
const populate = require('../utils/populate');

const { sequelize } = db;

async function initializer() {
  sequelize
    .authenticate()
    .then(() => {
      logger.ok('Connection has been established successfully :)');
    })
    .catch((err) => {
      logger.error('Unable to connect to the database:', err);
    });

  populate(sequelize, models);

  logger.log('API REST template Initialized!');
}

module.exports = initializer;
