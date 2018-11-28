const Assets = require("../ABI/SCRegistry");
const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const Proxy = require("./Proxy");
const utils = require("../utils");

const getList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("cryptocurrencies");
  this.instance = createInstance(Assets.abi, registryAddress, this);
  const addressesList = await errorHandler(
    this.instance.methods.getAssetsList().call()
  );

  const assetsList = addressesList.map(async address => {
    const assets = await this.instance.methods
      .getAssetByAddress(address)
      .call();
    const [assetsSymbol, assetsRate] = Object.values(assets);
    const symbol = utils.toUtf8(assetsSymbol);
    const rate = utils.fromWei(assetsRate);
    return { symbol, address, rate };
  });

  return Promise.all(assetsList);
};

const getRate = async key => {
  if (utils.is.not.string(key) && !utils.isAddress(key)) {
    Error({
      name: "params",
      message: "Acceptable parameters address or symbol token"
    });
  }

  const registryAddress = await Proxy.getRegistryAddress("cryptocurrencies");
  this.instance = createInstance(Assets.abi, registryAddress, this);

  if (utils.isAddress(key)) {
    const rate = await errorHandler(
      this.instance.methods.getAssetRate(key).call()
    );
    return utils.fromWei(rate);
  }

  const assetAddress = await errorHandler(
    this.instance.methods.getAssetAddress(utils.toHex(key)).call()
  );
  const rate = await errorHandler(
    this.instance.methods.getAssetRate(assetAddress).call()
  );
  return utils.fromWei(rate);
};

const getAddress = async symbol => {
  if (utils.is.not.string(symbol)) {
    Error({
      name: "params",
      message: "'symbol' must be a string"
    });
  }
  const registryAddress = await Proxy.getRegistryAddress("cryptocurrencies");
  this.instance = createInstance(Assets.abi, registryAddress, this);
  const assetAddress = await errorHandler(
    this.instance.methods.getAssetAddress(utils.toHex(symbol)).call()
  );

  return assetAddress;
};

const getSymbol = async address => {
  if (utils.is.not.string(address)) {
    Error({
      name: "params",
      message: "'address' must be a string"
    });
  }
  const registryAddress = await Proxy.getRegistryAddress("cryptocurrencies");
  this.instance = createInstance(Assets.abi, registryAddress, this);
  const hexSymbol = await errorHandler(
    this.instance.methods.getSymbol(address).call()
  );

  return utils.toUtf8(hexSymbol);
};

module.exports = {
  getList,
  getRate,
  getAddress,
  getSymbol
};