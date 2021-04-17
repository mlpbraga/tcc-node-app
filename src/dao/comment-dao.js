const _ = require('lodash');
const { models } = require('../models');
const { db } = require('../models');

const { Op } = db.Sequelize;
const {
  Comments, News, Votes, Results,
} = models;

const CommentDao = {
  async randomOne(reqParams) {
    let response = await Comments.findAll({
      where: {},
      include: [
        { model: Votes },
        { model: News, required: true },
      ],
    });

    // select only the comments that the user havent labeled yet
    response = response.filter((comment) => {
      let valid = true;
      comment.Votes.forEach((vote) => {
        if (vote.userId === reqParams.email) valid = false;
      });
      return valid;
    });

    const draw = [];
    const notVotedYet = [];
    const comments = [];

    response.forEach((comment) => {
      const votes = {
        sexist: comment.Votes.filter((vote) => vote.vote === 1).length,
        notSexist: comment.Votes.filter((vote) => vote.vote === 0).length,
        total: comment.Votes.length,
      };
      if (votes.total === 0) notVotedYet.push(comment);
      else if (votes.sexist === votes.notSexist) draw.push(comment);
      else comments.push(comment);
    });

    if (notVotedYet.length) return notVotedYet.sort(() => Math.random() - 0.5)[0];
    if (draw.length) return draw.sort(() => Math.random() - 0.5)[0];
    return comments.sort(() => Math.random() - 0.5)[0];
  },
  async read(reqParams) {
    const {
      id,
      newsid,
      limit,
      offset,
      query,
      label,
    } = reqParams;

    const where = {};
    const labelWhere = {};

    if (id) where.commentId = id;
    if (newsid) where.newsId = newsid;
    if (query) {
      where.content = { [Op.like]: `%${query}%` };
    }
    if (label) {
      if (label === 'sexist') labelWhere.avg = { [Op.gt]: 0.5 };
      else if (label === 'not-sexist') labelWhere.avg = { [Op.lt]: 0.5 };
      else if (label === 'undefined') labelWhere.avg = 0.5;
    }

    const response = await Comments.findAll({
      where,
      include: [
        { model: Votes },
        { model: News },
        {
          model: Results,
          required: true,
          where: labelWhere,
        },
      ],
      limit,
      offset,
    });
    return response;
  },
};

module.exports = CommentDao;
