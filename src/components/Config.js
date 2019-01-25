const { createInstance } = require("../helpers/createInstance");
const Error = require("../helpers/Error");
const {
  errorHandler,
  isAddress,
  isInteger,
  isNumber,
  isArray,
  isString,
  isBoolean
} = require("../helpers/errorHandler");

const getConfigDetails = require("../config/getConfigDetails");
const ABI = require("../helpers/utility-abi");
const signedTX = require("../helpers/signedTX");
const ETERNAL_STORAGE_ABI = require("../ABI/EternalStorage");
const CONFIG_WITH_PERMISSIONS_ABI = require("../ABI/ConfigWithPermissions");
const utils = require("../utils");
const Asset = require("./Asset");
const ERC20 = require("./ERC20");

const fields = {
  uint: ["maxTokens", "maxInvestors"],
  fees: ["platformFee", "entryFee", "exitFee"],
  names: ["projectName", "tokenName"]
};

/**
 * @module Project
 * @typicalname SDK.project
 */

/**
 * returns config address
 * @param {address} assetAddress
 * @returns {address} config address
 */
exports.getConfigAddress = async assetAddress => {
  isAddress({ assetAddress });
  const instance = createInstance(ABI.config, assetAddress);
  const configAddress = await errorHandler(instance.methods.config().call());
  return configAddress;
};

/**
 * returns config by config address
 * @param {string|address} configAddress
 * @returns {object} config
 */
exports.getConfig = async assetAddress => {
  isAddress({ assetAddress });
  const instance = createInstance(ABI.config, assetAddress);
  const configAddress = await errorHandler(instance.methods.config().call());
  const config = await errorHandler(getConfigDetails(configAddress));
  return config;
};

exports.getConfigDirectly = async configAddress => {
  isAddress({ configAddress });
  const config = await errorHandler(getConfigDetails(configAddress));
  return config;
};

/**
 * update project config
 * @param {address} configAddress asset address that will be sold
 * @param {string} key field name
 * @param {number|string} value new value
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {transaction}
 */

exports.update = async (
  configAddress,
  key,
  value,
  options,
  callback,
  estimate
) => {
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
    const { token } = await module.exports.getConfigDirectly(configAddress);
    if (key === "maxInvestors") {
      const investors = await Asset.getInvestors(token);
      if (investors > value) {
        Error({
          name: "params",
          message: `There are already ${investors} investors, the new value should be either equal to ${investors} or more`
        });
      }
    }

    if (key === "maxTokens") {
      const totalSupply = await ERC20.totalSupply(token);
      if (totalSupply > value) {
        Error({
          name: "params",
          message: `There are already ${totalSupply}  tokens, the new value should be either equal to ${totalSupply} or more`
        });
      }
    }

    action = await errorHandler(
      instance.methods.setUint(_key, utils.numberToHex(value))
    );
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
      nonce: options.nonce,
      callback,
      estimate
    })
  );
  return tx;
};

/**
 * update project permissions rule
 * @param {address} configAddress asset address that will be sold
 * @param {boolean} rule
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {transaction}
 */

exports.updatePermissionRule = async (
  configAddress,
  rule,
  options,
  callback,
  estimate
) => {
  isAddress({ configAddress });
  isBoolean({ rule });
  const instance = createInstance(CONFIG_WITH_PERMISSIONS_ABI, configAddress);
  const action = await errorHandler(
    instance.methods.updatePermissionRule(rule)
  );

  const tx = await errorHandler(
    signedTX({
      data: action,
      from: options.from,
      to: configAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      nonce: options.nonce,
      callback,
      estimate
    })
  );
  return tx;
};

/**
 * update project permissions wallet types
 * @param {address} configAddress asset address that will be sold
 * @param {number} countryID country ID
 * @param {array.<number>} walletTypes wallets types array
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {transaction}
 */

exports.updatePermission = async (
  configAddress,
  countryID,
  walletTypes,
  options,
  callback,
  estimate
) => {
  isAddress({ configAddress });
  isInteger({ countryID });
  isArray({ walletTypes });
  const instance = createInstance(CONFIG_WITH_PERMISSIONS_ABI, configAddress);
  const action = await errorHandler(
    instance.methods.updatePermissionByCountry(countryID, walletTypes)
  );

  const tx = await errorHandler(
    signedTX({
      data: action,
      from: options.from,
      to: configAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      nonce: options.nonce,
      callback,
      estimate
    })
  );
  return tx;
};

/**
 * returns permissions rule(tru or false)
 * @param {string|address} configAddress
 * @returns {boolean} rule
 */
exports.getPermissionsRule = async configAddress => {
  const instance = createInstance(CONFIG_WITH_PERMISSIONS_ABI, configAddress);
  isAddress({ configAddress });
  const rule = await errorHandler(instance.methods.getPermissionRule().call());
  return rule;
};

/**
 * returns permissions rule(tru or false)
 * @param {string|address} configAddress
 * @param {number} countryID ID of country
 * @returns{array.<number>} wallets types array
 */
exports.getPermissionsList = async (configAddress, countryID) => {
  isAddress({ configAddress });
  isInteger({ countryID });
  const instance = createInstance(CONFIG_WITH_PERMISSIONS_ABI, configAddress);
  const walletTypesRaw = await errorHandler(
    instance.methods.getPermissionsList(countryID).call()
  );
  // convert array to number array
  const walletTypes = walletTypesRaw.map(element => Number(element));

  return walletTypes;
};
