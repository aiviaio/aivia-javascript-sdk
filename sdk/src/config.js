const config = {
  HTTP_PROVIDER: null,
  ENTRY_POINT: null
};

function init(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE) {
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
