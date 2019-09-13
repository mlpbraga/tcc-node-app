const logger = require('../utils/logger');

const AuthValidation = require('../middlewares/auth');

const AuthController = {
  async handle(req, res, next) {
    logger.request(req);
    try {
      const response = await AuthValidation.login(req, res);
      return res.status(202).json(response);
    } catch (error) {
      logger.error(`AuthController :: handle ${error}`);
      return next(error);
    }
  },
};

module.exports = AuthController;
