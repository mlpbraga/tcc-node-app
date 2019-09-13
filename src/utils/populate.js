const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

module.exports = (sequelize, models) => {
  const { Users } = models;

  sequelize.sync({ force: true })
    .then(async () => {
      await Users.create({
        username: 'teste',
        email: 'teste@email.com',
        name: 'teste teste',
        birth: Date('1997-10-10'),
        gender: 'fem',
        password: bcrypt.hashSync('123'),
      });

      logger.log('Database & tables created! Sync happened.');
    });
};
