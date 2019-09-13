const logger = require('../utils/logger');
// const constant = require('../../../utils/constants');
// const bcrypt = require('bcryptjs');
// const _ = require('lodash');
// const UsersDAO = require('../../data/users-dao.js');

module.exports = {
  // async handlePost(req, res) {
  //   return res.status(200).json({});
  // },

  // async handlePut(req, res) {
  //   return res.status(200).json({});
  // },

  // async handleDelete(req, res) {
  //   return res.status(200).json({});
  // },

  async handleGet(req, res, next) {
    try {
      return res.status(200).json({ a: 'hehehe' });
    } catch (error) {
      logger.error(`Users Controller::handleGet ${error}`);
      logger.error(error);
      return next(error);
    }
  },

  // async destroyUser(req, res) {
  //   return res.status(200).json({});
  // },

};
