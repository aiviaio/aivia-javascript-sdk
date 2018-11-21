const Assets = require("../ABI/AssetsRegistry");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");

const getAssetsList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("tokens");

  this.instance = createInstance(Assets.abi, registryAddress, this);
  const addressesList = await errorHandler(
    this.instance.methods.getAssetsList().call()
  );

  const tokensList = addressesList.map(async address => {
    const hex = await this.instance.methods.getSymbol(address).call();
    const symbol = utils.hexToString(hex);
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
  this.instance = createInstance(Assets.abi, registryAddress, this);

  const address = await errorHandler(
    this.instance.methods.getAddress(utils.toHex(symbol)).call()
  );

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
  this.instance = createInstance(Assets.abi, registryAddress, this);

  const hexSymbol = await errorHandler(
    this.instance.methods.getSymbol(address).call()
  );

  return utils.hexToString(hexSymbol);
};

module.exports = {
  getAssetsList,
  getAssetAddress,
  getAssetSymbol
};
