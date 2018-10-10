const is = require("is_js");

const web3 = require("../core");
const Proxy = require("../ABI/Proxy");

const errorHandler = require("../helpers/errorHandler");
const errorMessage = require("../helpers/errorMessage");

const proxy = new web3.eth.Contract(Proxy.abi, Proxy.address);

const getContractAddress = (name, version) => {
  if (is.not.string(name)) {
    return errorMessage("params", "'name' field must be a string");
  }

  if (version && is.not.integer(version)) {
    return errorMessage("params", "'version' field must be a integer");
  }

  return errorHandler(
    proxy.methods.getContractAddress(web3.utils.fromAscii(name)).call()
  );
};

module.exports = {
  getContractAddress
};
