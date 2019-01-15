const ASSETS_REGISTRY_ABI = require("../ABI/AssetsRegistry");
const { createInstance } = require("../helpers/createInstance");
const {
  errorHandler,
  isString,
  isAddress
} = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");

/**
 * @module AssetsRegistry
 * @typicalname SDK.asset
 */

/**
 * returns assets list array
 * @returns {assetsList[]}
 * @property {object} assetsList.item
 * @property {string} item.symbol
 * @property {string} item.address
 */
exports.getList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("tokens");
  const instance = createInstance(ASSETS_REGISTRY_ABI, registryAddress);
  const addressesList = await errorHandler(
    instance.methods.getAssetsList().call()
  );
  const tokensList = addressesList.map(async address => {
    const hex = await errorHandler(instance.methods.getSymbol(address).call());
    const symbol = utils.toUtf8(hex);
    return { symbol, address };
  });

  return Promise.all(tokensList);
};

/**
 * returns asset address by symbol
 * @param {string} symbol
 * @returns {address} asset address
 */
exports.getAssetAddress = async symbol => {
  isString({ symbol });
  const registryAddress = await Proxy.getRegistryAddress("tokens");
  const instance = createInstance(ASSETS_REGISTRY_ABI, registryAddress);
  const address = await errorHandler(
    instance.methods.getAddress(utils.toHex(symbol)).call()
  );

  return address;
};

/**
 * returns asset symbol by address
 * @param {address} assetAddress
 * @returns {symbol} asset symbol
 */
exports.getAssetSymbol = async assetAddress => {
  isAddress({ assetAddress });
  const registryAddress = await Proxy.getRegistryAddress("tokens");
  const instance = createInstance(ASSETS_REGISTRY_ABI, registryAddress);
  const hexSymbol = await errorHandler(
    instance.methods.getSymbol(assetAddress).call()
  );
  return utils.toUtf8(hexSymbol);
};
