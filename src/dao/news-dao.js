const { models } = require('../models');

const { News } = models;

const NewsDao = {
  async read(reqParams) {
    const {
      id,
      newsId,
      limit,
      offset,
    } = reqParams;

    const where = {};

    if (id) where.newsId = newsId;

    const response = await News.findAll({
      where,
      limit,
      offset,
    });
    return response;
  },
};

module.exports = NewsDao;
