const web3 = require("../core");

module.exports = function createInstance(ABI, address, component) {
  if (!component.instance) {
    return new web3.eth.Contract(ABI, address);
  }
  return component.instance;
};
