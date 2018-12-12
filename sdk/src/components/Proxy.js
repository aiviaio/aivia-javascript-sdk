const Proxy = require("../ABI/Proxy");
const { createInstance } = require("../helpers/createInstance");
const { errorHandler, isAddress, isInteger, isString } = require("../helpers/errorHandler");
const EntryPoint = require("./EntryPoint");
const utils = require("../utils");

const getRegistryAddress = async key => {
  isString({ key });
  const proxyAddress = await EntryPoint.getProxyAddress();
  const instance = createInstance(Proxy.abi, proxyAddress);
  return errorHandler(instance.methods.getRegistryAddress(utils.toHex(key)).call());
};

const isDeployer = async deployerAddress => {
  isAddress({ deployerAddress });
  const proxyAddress = await EntryPoint.getProxyAddress();
  const instance = createInstance(Proxy.abi, proxyAddress);
  return errorHandler(instance.methods.isDeployer(deployerAddress).call());
};

const isAuditor = async (auditorAddress, type) => {
  isAddress({ auditorAddress });
  isInteger({ type });
  const proxyAddress = await EntryPoint.getProxyAddress();
  const instance = createInstance(Proxy.abi, proxyAddress);
  return errorHandler(instance.methods.isAuditor(auditorAddress, type).call());
};

module.exports = {
  getRegistryAddress,
  isDeployer,
  isAuditor
};
