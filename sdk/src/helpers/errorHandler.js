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
      message: message || `${name || "address"} must be integer`
    });
  }
};

const isAddressOrSymbol = (params, name, message) => {
  if (utils.is.not.string(params) && !utils.isAddress(params)) {
    Error({
      name: "params",
      message: message || `${name || "addressOrSymbol"} must be a address or symbol token`
    });
  }
};

const isString = (params, name, message) => {
  if (utils.is.not.string(params)) {
    Error({
      name: "params",
      message: message || `${name || "string"} must be a string`
    });
  }
};

const isNumber = (params, name, message) => {
  if (utils.is.not.number(params)) {
    Error({
      name: "params",
      message: message || `${name || "value"} must be a number`
    });
  }
};

module.exports = {
  errorHandler,
  isAddress,
  isInteger,
  isAddressOrSymbol,
  isString,
  isNumber
};
