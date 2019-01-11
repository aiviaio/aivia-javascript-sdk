"use strict";

var _require = require("./helpers/errorHandler"),
    isAddress = _require.isAddress,
    isString = _require.isString,
    isInteger = _require.isInteger;

var config = {
  HTTP_PROVIDER: null,
  ENTRY_POINT: null
};

function init(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE) {
  isString({
    HTTP_PROVIDER: {
      value: HTTP_PROVIDER,
      message: "'HTTP_PROVIDER' must be a string URL"
    }
  });
  isAddress({
    ENTRY_POINT: ENTRY_POINT
  });

  if (DEFAULT_GAS_PRICE) {
    isInteger({
      DEFAULT_GAS_PRICE: {
        value: DEFAULT_GAS_PRICE,
        message: "'DEFAULT_GAS_PRICE' must be a number(in wei)"
      }
    });
  }

  config.ENTRY_POINT = ENTRY_POINT;
  config.HTTP_PROVIDER = HTTP_PROVIDER;
  config.DEFAULT_GAS_PRICE = DEFAULT_GAS_PRICE;
}

function get(key) {
  return config[key];
}

module.exports = {
  init: init,
  get: get
};