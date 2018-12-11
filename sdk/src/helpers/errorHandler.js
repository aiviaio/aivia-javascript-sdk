const Error = require("../helpers/Error");
const utils = require("../utils");

const errorHandler = promise => {
  try {
    return promise;
  } catch (error) {
    throw new Error(error);
  }
};

const isAddress = (params, name, message) => {
  if (!utils.isAddress(params)) {
    Error({
      name: "params",
      message: message || `${name || "address"} must be a ethereum address`
    });
  }
};

const isInteger = (params, name, message) => {
  if (utils.is.not.integer(params)) {
    Error({
      name: "params",
      message: message || `${name || "address"} must be a integer`
    });
  }
};

module.exports = {
  errorHandler,
  isAddress,
  isInteger
};
