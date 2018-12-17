const CryptoHedge = require("./CryptoHedge");

const input = (type, params) => {
  const list = {
    1: CryptoHedge.input(params)
  };
  return Object.values(list[type]);
};

const output = (type, params) => {
  const list = {
    1: CryptoHedge.output(params)
  };
  return list[type];
};

module.exports = { input, output };
