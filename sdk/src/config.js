const Error = require("./helpers/Error");
const { isAddress } = require("./helpers/errorHandler");
const utils = require("./utils");

const config = {
  HTTP_PROVIDER: null,
  ENTRY_POINT: null
};

function init(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE) {
  if (utils.is.not.string(HTTP_PROVIDER)) {
    Error({
      name: "params",
      message: "'HTTP_PROVIDER' must be a string URL"
    });
  }

  isAddress(ENTRY_POINT, "ENTRY_POINT");

  if (DEFAULT_GAS_PRICE && utils.is.not.number(DEFAULT_GAS_PRICE)) {
    Error({
      name: "params",
      message: "'DEFAULT_GAS_PRICE' must be a number(in wei)"
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
  init,
  get
};
