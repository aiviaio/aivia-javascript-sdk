const utils = require("../utils");
const Asset = require("../components/Asset");
const SCRegistry = require("../components/SCRegistry");
const Config = require("../components/Config");

let storage = {
  rates: {}
};

const _getRate = async (address, isCurrency = false) => {
  if (storage.rates[address]) {
    return storage.rates[address];
  }
  if (isCurrency) {
    const currencyRate = await SCRegistry.getRate(address);
    storage.rates[address] = currencyRate;
    return currencyRate;
  }
  const assetRate = await Asset.getRate(address);
  storage.rates[address] = assetRate;
  return assetRate;
};

const _getAddress = async symbol => {
  if (storage.symbol) {
    return storage.symbol;
  }
  const address = await SCRegistry.getAddress(symbol);
  storage[symbol] = address;
  return address;
};

const estimateBuy = async (value, assetAddress, currencyAddress) => {
  const estimate = {};
  const { entryFee, platformFee } = await Config.getConfig(assetAddress);
  storage.AIV = await _getAddress("AIV");

  const assetRate = await _getRate(assetAddress);
  const AIVRate = await _getRate(storage.AIV, true);
  const currencyRate = await _getRate(currencyAddress, true);

  const inUSD = currencyRate * value;
  const platformFeeAmount = (inUSD * platformFee) / 100;
  const entryFeeAmount = (inUSD * entryFee) / 100;

  if (currencyAddress !== storage.AIV) {
    estimate.spend = value;
  } else {
    estimate.spend = utils.toFixed(inUSD / AIVRate);
  }

  estimate.received = utils.toFixed(inUSD / assetRate);

  estimate.fees = {
    platform: utils.toFixed(platformFeeAmount / AIVRate),
    manager: utils.toFixed(entryFeeAmount / AIVRate)
  };

  return estimate;
};

const estimateSell = async (value, assetAddress) => {
  const estimate = {};
  storage.TUSD = await _getAddress("TUSD");
  storage.AIV = await _getAddress("AIV");
  const { exitFee, platformFee } = await Config.getConfig(assetAddress);
  const AIVRate = await _getRate(storage.AIV, true);
  const TUSDRate = await _getRate(storage.TUSD, true);
  const assetRate = await _getRate(assetAddress);
  const inUSD = assetRate * value;

  const platformFeeAmount = (inUSD * platformFee) / 100;
  const exitFeeAmount = (inUSD * exitFee) / 100;

  estimate.spend = utils.toFixed(inUSD / assetRate);

  estimate.received = utils.toFixed(inUSD / TUSDRate);

  estimate.fees = {
    platform: utils.toFixed(platformFeeAmount / AIVRate),
    manager: utils.toFixed(exitFeeAmount / AIVRate)
  };
  return estimate;
};

const estimateTX = (value, assetAddress, currencyAddress) => {
  if (currencyAddress) {
    return estimateBuy(value, assetAddress, currencyAddress);
  }
  return estimateSell(value, assetAddress);
};

const clearStorage = () => {
  storage = {};
  return true;
};

module.exports = {
  estimateTX,
  clearStorage
};
