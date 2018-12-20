const Error = require("../helpers/Error");
const utils = require("../utils");

const errorHandler = promise => {
  try {
    return promise;
  } catch (error) {
    throw new Error(error);
  }
};

const isAddress = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = utils.is.object(params[key]) ? params[key].value : params[key];
      if (!utils.isAddress(value)) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a ethereum address`
        });
      }
    }
  }
};

const isInteger = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = utils.is.object(params[key]) ? params[key].value : params[key];
      if (utils.is.not.integer(value)) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a integer`
        });
      }
    }
  }
};

const isAddressOrSymbol = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = utils.is.object(params[key]) ? params[key].value : params[key];
      if (utils.is.not.string(value) && !utils.isAddress(value)) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a address or symbol token`
        });
      }
    }
  }
};

const isString = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = utils.is.object(params[key]) ? params[key].value : params[key];
      if (utils.is.not.string(value)) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a string`
        });
      }
    }
  }
};

const isNumber = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = utils.is.object(params[key]) ? params[key].value : params[key];
      if (utils.is.not.number(value) && utils.is.not.number(Number(value))) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a number`
        });
      }
    }
  }
};

const isArray = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value =
        utils.is.object(params[key]) && params[key].value ? params[key].value : params[key];
      if (!Array.isArray(value)) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a array`
        });
      }
    }
  }
};

const isFunction = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = utils.is.object(params[key]) ? params[key].value : params[key];
      if (value && utils.is.not.function(value)) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a function`
        });
      }
    }
  }
};

const isBoolean = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = utils.is.object(params[key]) ? params[key].value : params[key];
      if (utils.is.not.boolean(value)) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a boolean`
        });
      }
    }
  }
};

const isObject = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      if (utils.is.not.object(params[key])) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a object`
        });
      }
    }
  }
};

const isZeroAddress = params => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = utils.is.object(params[key]) ? params[key].value : params[key];
      if (utils.isAddress(value) && value !== utils.ZERO_ADDRESS) {
        Error({
          name: "params",
          message: params[key].message || `${key} must be a ZERO_ADDRESS`
        });
      }
    }
  }
};

module.exports = {
  errorHandler,
  isAddress,
  isInteger,
  isAddressOrSymbol,
  isString,
  isNumber,
  isArray,
  isFunction,
  isBoolean,
  isObject,
  isZeroAddress
};
