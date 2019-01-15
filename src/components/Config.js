const { createInstance } = require("../helpers/createInstance");
const Error = require("../helpers/Error");
const {
  errorHandler,
  isAddress,
  isInteger,
  isNumber,
  isArray,
  isString
} = require("../helpers/errorHandler");

const getConfigDetails = require("../config/getConfigDetails");
const ABI = require("../helpers/utility-abi");
const signedTX = require("../helpers/signedTX");
const ETERNAL_STORAGE_ABI = require("../ABI/EternalStorage");
const utils = require("../utils");

const fields = {
  uint: ["maxTokens", "maxInvestors"],
  fees: ["platformFee", "entryFee", "exitFee"],
  names: ["projectName", "tokenName"]
};

const getConfig = async assetAddress => {
  isAddress({ assetAddress });
  const instance = createInstance(ABI.config, assetAddress);
  const configAddress = await errorHandler(instance.methods.config().call());
  const config = await errorHandler(getConfigDetails(configAddress));
  return config;
};

const getConfigDirectly = async configAddress => {
  isAddress({ configAddress });
  const config = await errorHandler(getConfigDetails(configAddress));
  return config;
};

const updatePermission = async (
  configAddress,
  countryID,
  walletTypes,
  options,
  callback
) => {
  isAddress({ configAddress });
  isInteger({ countryID });
  isArray({ walletTypes });
  const instance = createInstance(ABI.updatePermission, configAddress);
  const action = await errorHandler(
    instance.methods.updatePermissionByCountry(countryID, walletTypes)
  );

  await errorHandler(
    signedTX({
      data: action,
      from: options.from,
      to: configAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );
};

const update = async (configAddress, key, value, options, callback) => {
  if (![...fields.names, ...fields.fees, ...fields.uint].includes(key)) {
    Error({
      name: "params",
      message: `field ${key} can not be updated`
    });
  }
  const instance = createInstance(ETERNAL_STORAGE_ABI, configAddress);

  const _key = utils.toHex(key);
  let action = null;

  if (fields.names.includes(key)) {
    isString({ value });
    action = await errorHandler(
      instance.methods.setBytes(_key, utils.toHex(value))
    );
  }

  if (fields.uint.includes(key)) {
    isInteger({ value });
    action = await errorHandler(instance.methods.setUint(_key, value));
  }

  if (fields.fees.includes(key)) {
    isNumber({ value });
    action = await errorHandler(
      instance.methods.setUint(_key, utils.toWei(value))
    );
  }

  const tx = await errorHandler(
    signedTX({
      data: action,
      from: options.from,
      to: configAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );
  return tx;
};

module.exports = {
  getConfig,
  getConfigDirectly,
  updatePermission,
  update
};
