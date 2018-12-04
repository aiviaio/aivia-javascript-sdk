const AssetsRegistry = require("../ABI/AssetsRegistry");
const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");

const getAssetsList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("tokens");

  const instance = createInstance(AssetsRegistry.abi, registryAddress);
  const addressesList = await errorHandler(instance.methods.getAssetsList().call());

  const tokensList = addressesList.map(async address => {
    const hex = await instance.methods.getSymbol(address).call();
    const symbol = utils.toUtf8(hex);
    return { symbol, address };
  });

  return Promise.all(tokensList);
};

const getAssetAddress = async symbol => {
  if (utils.is.not.string(symbol)) {
    Error({
      name: "params",
      message: "'symbol' must be a string"
    });
  }

  const registryAddress = await Proxy.getRegistryAddress("tokens");
  const instance = createInstance(AssetsRegistry.abi, registryAddress);
  const address = await errorHandler(instance.methods.getAddress(utils.toHex(symbol)).call());

  return address;
};

const getAssetSymbol = async address => {
  if (!utils.isAddress(address)) {
    Error({
      name: "params",
      message: "'address' must be a address"
    });
  }

  const registryAddress = await Proxy.getRegistryAddress("tokens");
  const instance = createInstance(AssetsRegistry.abi, registryAddress);

  const hexSymbol = await errorHandler(instance.methods.getSymbol(address).call());

  return utils.toUtf8(hexSymbol);
};

module.exports = {
  getAssetsList,
  getAssetAddress,
  getAssetSymbol
};
