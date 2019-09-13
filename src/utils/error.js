/* eslint-disable max-classes-per-file */
class BaseError extends Error {
  constructor(message, status) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
}

class RequestError extends BaseError {
  constructor({ code, message, fields }) {
    const errorMsg = message;

    // Overriding both message and status code
    super(errorMsg || 'Request validation failed', 400);

    // Saving custom property
    this.code = 1001;
    if (code !== undefined) {
      this.code = code;
    }

    this.fields = fields || [];
  }
}

// eslint-disable-next-line no-unused-vars
class ResponseError extends BaseError {
  constructor({ message, code }) {
    // Overriding both message and status code
    super(message || 'Something went wrong', 500);

    // Saving custom property
    this.code = 1000;
    if (code !== undefined) {
      this.code = code;
    }
  }
}

const throwBadRequest = ({
  code, message, fields,
}) => {
  throw new RequestError({
    code,
    message,
    fields,
  });
};

module.exports = {
  BaseError,
  RequestError,
  ResponseError,
  throwBadRequest,
};
