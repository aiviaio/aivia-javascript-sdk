const Assets = require("../ABI/AssetsRegistry");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const Proxy = require("./Proxy");
const utils = require("../utils");

const getAssetsList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("assets");
  this.instance = createInstance(Assets.abi, registryAddress, this);
  const addressesList = await errorHandler(
    this.instance.methods.getAssetsList().call()
  );

  const assetsList = addressesList.map(async address => {
    const assets = await this.instance.methods
      .getAssetByAddress(address)
      .call();
    const [assetsSymbol, assetsRate] = Object.values(assets);
    const symbol = utils.hexToString(assetsSymbol);
    const rate = utils.fromWei(assetsRate);
    return { symbol, address, rate };
  });

  return Promise.all(assetsList);
};

const getAssetRate = async key => {
  if (utils.is.not.string(key) && !utils.isAddress(key)) {
    Error({
      name: "params",
      message: "Acceptable parameters address or symbol token"
    });
  }

  const registryAddress = await Proxy.getRegistryAddress("assets");
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

module.exports = {
  getAssetsList,
  getAssetRate
};
