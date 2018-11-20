const OpenEnd = require("./OpenEnd");

const input = (type, params) => {
  const list = {
    1: OpenEnd.input(params)
  };
  return Object.values(list[type]);
};

const output = (type, params) => {
  const list = {
    1: OpenEnd.output(params)
  };
  return list[type];
};

module.exports = { input, output };
