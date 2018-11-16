const OpenEnd = require("./OpenEnd");

module.exports = (type, params) => {
  const list = {
    1: OpenEnd(params)
  };
  return Object.values(list[type]);
};
