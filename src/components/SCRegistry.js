const SC_REGISTRY_ABI = require("../ABI/SCRegistry");
const { createInstance } = require("../helpers/createInstance");
const {
  errorHandler,
  isAddressOrSymbol,
  isString,
  isAddress
} = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");

/**
 * @module Currency
 * @typicalname SDK.platform.currency
 */

/**
 * returns platform currencies list
 * @returns {currenciesList[]}
 * @property {object} currenciesList.item
 * @property {string} item.symbol
 * @property {string} item.address
 * @property {number} item.rate
 */
exports.getList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("cryptocurrencies");
  const instance = createInstance(SC_REGISTRY_ABI, registryAddress);
  const addressesList = await errorHandler(
    instance.methods.getAssetsList().call()
  );
  const assetsList = addressesList.map(async address => {
    const assets = await instance.methods.getAssetByAddress(address).call();
    const [assetsSymbol, assetsRate] = Object.values(assets);
    const symbol = utils.toUtf8(assetsSymbol);
    const rate = utils.fromWei(assetsRate);
    return { symbol, address, rate };
  });

  return Promise.all(assetsList);
};

/**
 * returns  currency rate by address or symbol
 * @param {string|address} addressOrSymbol
 * @returns {rate} - rate of currency
 */
exports.getRate = async addressOrSymbol => {
  isAddressOrSymbol({ addressOrSymbol });

  const registryAddress = await Proxy.getRegistryAddress("cryptocurrencies");
  const instance = createInstance(SC_REGISTRY_ABI, registryAddress);
  if (utils.isAddress(addressOrSymbol)) {
    const rate = await errorHandler(
      instance.methods.getAssetRate(addressOrSymbol).call()
    );
    return utils.fromWei(rate);
  }

  const assetAddress = await errorHandler(
    instance.methods.getAssetAddress(utils.toHex(addressOrSymbol)).call()
  );
  const rate = await errorHandler(
    instance.methods.getAssetRate(assetAddress).call()
  );
  return utils.fromWei(rate);
};

/**
 * returns currency address by symbol
 * @param {string} symbol
 * @returns {address} currency address
 */
exports.getAddress = async symbol => {
  isString({ symbol });
  const registryAddress = await Proxy.getRegistryAddress("cryptocurrencies");
  const instance = createInstance(SC_REGISTRY_ABI, registryAddress);
  const assetAddress = await errorHandler(
    instance.methods.getAssetAddress(utils.toHex(symbol)).call()
  );

  return assetAddress;
};

/**
 * returns currency symbol by address
 * @param {address} currencyAddress
 * @returns {symbol} currency symbol
 */
exports.getSymbol = async currencyAddress => {
  isAddress({ currencyAddress });
  const registryAddress = await Proxy.getRegistryAddress("cryptocurrencies");
  const instance = createInstance(SC_REGISTRY_ABI, registryAddress);
  const hexSymbol = await errorHandler(
    instance.methods.getSymbol(currencyAddress).call()
  );
  return utils.toUtf8(hexSymbol);
};
