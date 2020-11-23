const _ = require('lodash');
const logger = require('../utils/logger');
const CommentsDAO = require('../dao/comment-dao');
// const constant = require('../../../utils/constants');


module.exports = {
  async handleGetRandom(req, res, next) {
    let response;
    try {
      response = await CommentsDAO.randomOne(req.user);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`Comments Controller::handleGetRandom ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
  async handleGet(req, res, next) {
    try {
      const response = await CommentsDAO.read(req.query);
      // response formatter
      const formattedResponse = response.map((comment) => _.omit({
        ...comment.dataValues,
        label: comment.Votes.reduce(function (avg, value, _, { length }) {
          return avg + value.vote / length;
        }, 0),
        votes: {
          sexist: comment.Votes.filter((vote) => vote.vote === 1).length,
          notSexist: comment.Votes.filter((vote) => vote.vote === 0).length,
          total: comment.Votes.length,
        },
        news: comment.News,
      }, ['Votes', 'news_id', 'News']));

      return res.status(200).json(formattedResponse);
    } catch (error) {
      logger.error(`Comments Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
