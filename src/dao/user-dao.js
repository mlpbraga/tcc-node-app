const op = require('sequelize').Op;
const { models } = require('../models');

const { Users } = models;

const UserDao = {
  async query(reqParams) {
    const {
      id,
      q,
      deleted,
    } = reqParams;

    let where;
    let response = {};

    if (deleted) {
      where = {};
    } else {
      where = { deleted: false };
    }

    if (q) {
      where[op.or] = [
        { name: { [op.like]: `%${q}%` } },
        { username: { [op.like]: `%${id}%` } },
      ];
      response = await Users.findAll({ where });
    } else if (id) {
      where.username = { [op.like]: `%${id}%` };
      response = await Users.findOne({ where });
    } else {
      response = await Users.findAll({ where });
    }

    return response;
  },
};

module.exports = UserDao;
