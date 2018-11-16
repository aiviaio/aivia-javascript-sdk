const EntryPoint = require("../ABI/EntryPoint");
const getInstance = require("../helpers/getInstance");
const errorHandler = require("../helpers/errorHandler");

/**
 * get proxy address
 */
const getProxyAddress = () => {
  this.instance = getInstance(EntryPoint.abi);
  return errorHandler(this.instance.methods.getProxyAddress().call());
};

module.exports = {
  getProxyAddress
};
