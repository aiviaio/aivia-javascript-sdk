const config = {
  HTTP_PROVIDER: null,
  ENTRY_POINT: null
};

function init(ENTRY_POINT, HTTP_PROVIDER) {
  config.ENTRY_POINT = ENTRY_POINT;
  config.HTTP_PROVIDER = HTTP_PROVIDER;
}

function get(key) {
  return config[key];
}

module.exports = {
  init,
  get
};
