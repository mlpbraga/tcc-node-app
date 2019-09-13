const Joi = require('joi');
const { throwBadRequest } = require('../../utils/error');

const getSchema = {
  query: Joi.object().max(0)
    .error(() => {
      throwBadRequest({
        code: 2,
        message: 'a',
        fields: ['query'],
      });
    }),
};

module.exports = getSchema;
