const { models } = require('../models');
const { db } = require('../models');

const { Comments, News, Votes } = models;

const querys = {
  voteQuantFreq : `
  with c as (select comment_id,count(vote_id) as qtd from votes group by (comment_id))
  select qtd, count(qtd) from c group by (qtd);
  `,
  voteQuantPerClass : `
  select vote, count(vote_id) from votes group by (vote);
  `,
  
}



const CommentDao = {
  async randomOne(reqParams) {
    const { email } = reqParams;

    let where;
    let response = {};
    response = await Comments.findAll({
      where,
      include: [Votes, News],
    });
    const chosen = [];
    const min = 2;
    response.forEach((comment) => {
      if (comment.dataValues.Votes.length === 2) {
        let alreadyVoted = false;
        comment.dataValues.Votes.forEach((vote) => {
          if (vote.dataValues.userId === email) {
            alreadyVoted = true;
          }
        });
        if (!alreadyVoted) {
          chosen.push(comment.dataValues);
        }
      }
    });

    if (chosen.length === 0) {
      if (comment.dataValues.Votes.length === 1) {
        let alreadyVoted = false;
        comment.dataValues.Votes.forEach((vote) => {
          if (vote.dataValues.userId === email) {
            alreadyVoted = true;
          }
        });
        if (!alreadyVoted) {
          chosen.push(comment.dataValues);
        }
      }
    }
    if (chosen.length === 0) {   
      let alreadyVoted = false;
      comment.dataValues.Votes.forEach((vote) => {
        if (vote.dataValues.userId === email) {
          alreadyVoted = true;
        }
      });
      if (!alreadyVoted) {
        chosen.push(comment.dataValues);
      }
    }
    return chosen.sort(() => Math.random() - 0.5)[0];
  },
  async metrics() {
    const commentsCount = await Comments.count();
    const voteQuantFreq = await db.sequelize.query(querys.voteQuantFreq);
    const voteQuantPerClass = await db.sequelize.query(querys.voteQuantPerClass);
    return {
      commentsCount,
      voteQuantFreq,
      voteQuantPerClass

    };
  },
};

module.exports = CommentDao;
