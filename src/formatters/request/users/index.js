const _ = require('lodash');
const BaseRequestFormatter = require('../base');

const UsersRequestFormatter = {
  format(reqParams) {
    let formattedParams = BaseRequestFormatter.format(reqParams);
    const {
      username,
      email,
      name,
      birth,
      gender,
      password,
    } = reqParams.body;

    formattedParams = _.merge(
      formattedParams,
      {
        username,
        email,
        name,
        birth,
        gender,
        password,
      },
    );
    return formattedParams;
  },
};

module.exports = UsersRequestFormatter;
