const Proxy = require("../ABI/Proxy");
const { createInstance } = require("../helpers/createInstance");
const { errorHandler, isAddress, isInteger, isString } = require("../helpers/errorHandler");
const EntryPoint = require("./EntryPoint");
const utils = require("../utils");

const getRegistryAddress = async key => {
  isString(key, "key");
  const proxyAddress = await EntryPoint.getProxyAddress();
  const instance = createInstance(Proxy.abi, proxyAddress);
  return errorHandler(instance.methods.getRegistryAddress(utils.toHex(key)).call());
};

const isDeployer = async address => {
  isAddress(address);
  const proxyAddress = await EntryPoint.getProxyAddress();
  const instance = createInstance(Proxy.abi, proxyAddress);
  return errorHandler(instance.methods.isDeployer(address).call());
};

const isAuditor = async (address, type) => {
  isAddress(address);
  isInteger(type, "type");
  const proxyAddress = await EntryPoint.getProxyAddress();
  const instance = createInstance(Proxy.abi, proxyAddress);
  return errorHandler(instance.methods.isAuditor(address, type).call());
};

module.exports = {
  getRegistryAddress,
  isDeployer,
  isAuditor
};
