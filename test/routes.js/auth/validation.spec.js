const _ = require('lodash');
const Joi = require('joi');
const validationSchema = require('../../../src/routes/auth/validation');

let sample;

describe('POST auth route schema query validation', () => {
  beforeEach(() => {
    sample = {
      query: {},
      body: {},
    };
  });

  it('should have "username" or "email" parameters', () => {
    const input = _.merge(
      sample,
      { body: { password: 'pass' } },
    );

    const result = () => {
      Joi.validate(input, validationSchema);
    };

    expect(result).to.throw(
      'Missing email or username',
    );
  });

  it('should have "password" parameter even when username is given', () => {
    const input = _.merge(
      sample,
      { body: { username: 'foo' } },
    );
    const result = () => {
      Joi.validate(input, validationSchema);
    };

    expect(result).to.throw(
      'Missing password field',
    );
  });

  it('should have "password" parameter even when email is given', () => {
    const input = _.merge(
      sample,
      { body: { email: 'foo@bar.com' } },
    );
    const result = () => {
      Joi.validate(input, validationSchema);
    };
    expect(result).to.throw(
      'Missing password field',
    );
  });
  // eslint-disable-next-line max-len
  it('should not allow "email" and "username" parameters at the same time', () => {
    const input = _.merge(
      sample,
      {
        body: {
          email: 'foo@bar.com',
          username: 'foo',
          password: 'bar',
        },
      },
    );
    const result = () => {
      Joi.validate(input, validationSchema);
    };
    expect(result).to.throw(
      'Parameters "email" and "username" are mutually exclusive',
    );
  });
});
