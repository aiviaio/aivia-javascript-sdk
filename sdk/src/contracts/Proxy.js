const is = require("is_js");

const web3 = require("../core");
const Proxy = require("../ABI/Proxy");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");

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
    return Error({ name: "params", message: "'name' field must be a string" });
  }

  if (version && is.not.integer(version)) {
    return Error({
      name: "params",
      message: "'version' field must be a integer"
    });
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

/**
 * Get user details by user address
 *
 * @param {sting/hex} address
 * @returns {Object} {country ID, wallet type ID, expiration Date}
 */
const getUserDetails = async address => {
  if (!web3.utils.isAddress(address)) {
    return Error({ name: "params", message: "'address' is wrong checksum" });
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
    return Error({ name: "params", message: "'address' is wrong checksum" });
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

const getAuditorsList = () =>
  errorHandler(proxy.methods.getAuditorsList().call());

const isAuditor = address => {
  if (!web3.utils.isAddress(address)) {
    return Error({ name: "params", message: "'address' is wrong checksum" });
  }
  return errorHandler(proxy.methods.isAuditor(address).call());
};

const getCustodiansList = () =>
  errorHandler(proxy.methods.getCustodiansList().call());

const getCustodianName = async address => {
  if (!web3.utils.isAddress(address)) {
    return Error({ name: "params", message: "'address' is wrong checksum" });
  }
  const name = await errorHandler(
    proxy.methods.getCustodianName(address).call()
  );
  return web3.utils.hexToUtf8(name);
};

const getAssetsList = () => errorHandler(proxy.methods.getAssetsList().call());

const getAssetRate = async address => {
  if (!web3.utils.isAddress(address)) {
    return Error({ name: "params", message: "'address' is wrong checksum" });
  }
  const rate = await errorHandler(proxy.methods.getAssetRate(address).call());
  return Number(web3.utils.fromWei(rate, "ether"));
};

const getAssetAddress = async name => {
  if (is.not.string(name)) {
    return Error({ name: "params", message: "'name' field must be a string" });
  }
  const address = await errorHandler(
    proxy.methods.getAssetAddress(web3.utils.utf8ToHex(name)).call()
  );
  return address;
};

module.exports = {
  getContractAddress,
  getUserDetails,
  getUsersList,
  getAuditorDetails,
  getAuditorsList,
  isAuditor,
  getCustodiansList,
  getCustodianName,
  getAssetsList,
  getAssetRate,
  getAssetAddress
};
