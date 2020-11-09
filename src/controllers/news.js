const logger = require('../utils/logger');
const NewsDAO = require('../dao/news-dao');

module.exports = {
  async handleGet(req, res, next) {
    try {
      const response = await NewsDAO.read(req.query);
      // response formatter
      const formattedResponse = response.map(news => {
        return {
          ...news.dataValues,
          commentsLink: `/comments?newsId=${news.dataValues.newsId}`,
        }
      });
      return res.status(200).json(formattedResponse);
    } catch (error) {
      logger.error(`News Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
