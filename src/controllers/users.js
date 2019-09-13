const logger = require('../utils/logger');
const UsersRequestFormatter = require(
  '../formatters/request/users',
);
const UsersDAO = require('../dao/user-dao');
// const constant = require('../../../utils/constants');
// const bcrypt = require('bcryptjs');
// const _ = require('lodash');

module.exports = {
  async handlePost(req, res, next) {
    let response;
    try {
      const reqParams = UsersRequestFormatter.format(req);
      response = await UsersDAO.query(reqParams);
      return res.status(201).json(response);
    } catch (error) {
      logger.error(`Users Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },

  // async handlePut(req, res) {
  //   return res.status(200).json({});
  // },

  // async handleDelete(req, res) {
  //   return res.status(200).json({});
  // },

  async handleGet(req, res, next) {
    let response;
    try {
      const reqParams = UsersRequestFormatter.format(req);
      response = await UsersDAO.query(reqParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`Users Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
  // async destroyUser(req, res) {
  //   return res.status(200).json({});
  // },

};
