"use strict";

var Error = require("../helpers/Error");

var utils = require("../utils");

var errorHandler = function errorHandler(promise) {
  try {
    return promise;
  } catch (error) {
    return Error({
      name: "async",
      message: error.message
    });
  }
};

var isAddress = function isAddress(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) ? params[key].value : params[key];

      if (!utils.isAddress(value)) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a ethereum address")
        });
      }
    }
  }
};

var isInteger = function isInteger(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) ? params[key].value : params[key];

      if (utils.is.not.integer(value)) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a integer")
        });
      }
    }
  }
};

var isAddressOrSymbol = function isAddressOrSymbol(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) ? params[key].value : params[key];

      if (utils.is.not.string(value) && !utils.isAddress(value)) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a address or symbol token")
        });
      }
    }
  }
};

var isString = function isString(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) ? params[key].value : params[key];

      if (utils.is.not.string(value)) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a string")
        });
      }
    }
  }
};

var isNumber = function isNumber(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) ? params[key].value : params[key];

      if (utils.is.not.number(value) && utils.is.not.number(Number(value))) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a number")
        });
      }
    }
  }
};

var isArray = function isArray(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) && params[key].value ? params[key].value : params[key];

      if (!Array.isArray(value)) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a array")
        });
      }
    }
  }
};

var isFunction = function isFunction(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) ? params[key].value : params[key];

      if (value && utils.is.not.function(value)) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a function")
        });
      }
    }
  }
};

var isBoolean = function isBoolean(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) ? params[key].value : params[key];

      if (utils.is.not.boolean(value)) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a boolean")
        });
      }
    }
  }
};

var isObject = function isObject(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      if (utils.is.not.object(params[key])) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a object")
        });
      }
    }
  }
};

var isZeroAddress = function isZeroAddress(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = utils.is.object(params[key]) ? params[key].value : params[key];

      if (utils.isAddress(value) && value !== utils.ZERO_ADDRESS) {
        Error({
          name: "params",
          message: params[key] && params[key].message || "".concat(key, " must be a ZERO_ADDRESS")
        });
      }
    }
  }
};

module.exports = {
  errorHandler: errorHandler,
  isAddress: isAddress,
  isInteger: isInteger,
  isAddressOrSymbol: isAddressOrSymbol,
  isString: isString,
  isNumber: isNumber,
  isArray: isArray,
  isFunction: isFunction,
  isBoolean: isBoolean,
  isObject: isObject,
  isZeroAddress: isZeroAddress
};