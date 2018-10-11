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

const getUserDetails = async address => {
  if (!web3.utils.isAddress(address)) {
    return Message("params", "'address' is wrong checksum");
  }

  const result = await errorHandler(
    proxy.methods.getUserDetails(address).call()
  );
  const [country, walletType, expirationDate] = Object.values(result);

  return {
    country: Number(country),
    walletType: Number(walletType),
    expirationDate: Number(expirationDate)
  };
};

const getUsersList = () => errorHandler(proxy.methods.getUsersList().call());

const getAuditorDetails = async address => {
  if (!web3.utils.isAddress(address)) {
    return Message("params", "'address' is wrong checksum");
  }

  const result = await errorHandler(
    proxy.methods.getAuditorDetails(address).call()
  );

  const [name, auditorType, expirationDate] = Object.values(result);

  return {
    name: web3.utils.hexToUtf8(name),
    type: Number(auditorType),
    expirationDate: Number(expirationDate)
  };
};

module.exports = {
  getContractAddress,
  getUserDetails,
  getUsersList,
  getAuditorDetails
};
