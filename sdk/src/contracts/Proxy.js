const is = require("is_js");

const web3 = require("../core");
const Proxy = require("../ABI/Proxy");

const errorHandler = require("../helpers/errorHandler");
const Message = require("../helpers/Message");

const proxy = new web3.eth.Contract(Proxy.abi, Proxy.address);

/**
 * get contract address by name
 * or needed contract address by name  version
 * @param {string} name
 * @param {string} version
 * @returns promise
 */
const getContractAddress = (name, version) => {
  if (is.not.string(name)) {
    return Message("params", "'name' field must be a string");
  }

  if (version && is.not.integer(version)) {
    return Message("params", "'version' field must be a integer");
  }
  if (version) {
    return errorHandler(
      proxy.methods
        .getContractAddressSpecificVersion(web3.utils.utf8ToHex(name), version)
        .call()
    );
  }

  return errorHandler(
    proxy.methods.getContractAddress(web3.utils.utf8ToHex(name)).call()
  );
};

const getUserDetails = address => {
  if (!web3.utils.isAddress(address)) {
    return Message("params", "is wrong checksum");
  }

  return errorHandler(proxy.methods.getUserDetails(address).call());
};

module.exports = {
  getContractAddress,
  getUserDetails
};
