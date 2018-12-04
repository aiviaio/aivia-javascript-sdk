const detectSymbol = require("../helpers/detectSymbol");
const utils = require("../utils");
const Asset = require("../components/Asset");
const SCRegistry = require("../components/SCRegistry");
const Config = require("../components/Config");

const estimateBuy = async (value, assetAddress, currencyAddress) => {
  const estimate = {};
  const { entryFee, platformFee } = await Config.getConfig(assetAddress);

  this.TUSD = this.TUSD || (await SCRegistry.getAddress("TUSD"));
  this.AIV = this.AIV || (await SCRegistry.getAddress("AIV"));
  const assetSymbol = await detectSymbol(assetAddress);
  const assetRate = await Asset.getRate(assetAddress);
  const AIVRate = await SCRegistry.getRate(this.AIV);

  const currencySymbol = await detectSymbol(currencyAddress);
  const currencyRate = await SCRegistry.getRate(currencyAddress);
  const inUSD = currencyRate * value;

  const platformFeeAmount = (inUSD * platformFee) / 100;
  const entryFeeAmount = (inUSD * entryFee) / 100;

  const remaining = inUSD - (platformFeeAmount + entryFeeAmount);

  if (currencyAddress !== this.AIV) {
    estimate[currencySymbol] = value;
  } else {
    estimate[currencySymbol] = utils.toFixed(remaining / AIVRate);
  }

  estimate.fees = {
    platform: utils.toFixed(platformFeeAmount / AIVRate),
    entry: utils.toFixed(entryFeeAmount / AIVRate)
  };

  estimate[assetSymbol] = utils.toFixed(remaining / assetRate);

  return estimate;
};

const estimateSell = async (value, assetAddress) => {
  const estimate = {};
  this.TUSD = this.TUSD || (await SCRegistry.getAddress("TUSD"));
  this.AIV = this.AIV || (await SCRegistry.getAddress("AIV"));
  const { exitFee, platformFee } = await Config.getConfig(assetAddress);
  const AIVRate = await SCRegistry.getRate(this.AIV);
  const TUSDRate = await SCRegistry.getRate(this.TUSD);
  const assetSymbol = await detectSymbol(assetAddress);
  const assetRate = await Asset.getRate(assetAddress);
  const inUSD = assetRate * value;

  const platformFeeAmount = (inUSD * platformFee) / 100;
  const exitFeeAmount = (inUSD * exitFee) / 100;
  const remaining = inUSD - (platformFeeAmount + exitFeeAmount);
  estimate[assetSymbol] = utils.toFixed(remaining / assetRate);

  estimate.TUSD = utils.toFixed(remaining / TUSDRate);

  estimate.fees = {
    platform: utils.toFixed(platformFeeAmount / AIVRate),
    exit: utils.toFixed(exitFeeAmount / AIVRate)
  };

  return estimate;
};

module.exports = (value, assetAddress, currencyAddress) =>
  currencyAddress
    ? estimateBuy(value, assetAddress, currencyAddress)
    : estimateSell(value, assetAddress);
