const is = require("is_js");

class CustomError extends Error {
  constructor(name, message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    // Custom debugging information
    this.name = name;
    this.message = message;
    this.date = new Date();
  }
}

module.exports = (name, message) => {
  if (is.not.string(name) && is.not.string(is.not.string(message))) {
    throw new CustomError("SDK error", "Parameters are not correct");
  }

  throw new CustomError(name, message);
};
