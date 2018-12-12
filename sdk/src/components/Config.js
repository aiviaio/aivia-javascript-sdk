const { createInstance } = require("../helpers/createInstance");
const {
  errorHandler,
  isAddress,
  isInteger,
  isArray,
  isFunction
} = require("../helpers/errorHandler");
const getConfigDetails = require("../config/getConfigDetails");
const ABI = require("../helpers/utility-abi");
const signedTX = require("../helpers/signedTX");

const getConfig = async assetAddress => {
  isAddress({ assetAddress });
  const instance = createInstance(ABI.config, assetAddress);
  const configAddress = await errorHandler(instance.methods.config().call());
  const config = await getConfigDetails(configAddress);
  return config;
};

const getConfigDirectly = async configAddress => {
  isAddress({ configAddress });
  const config = await getConfigDetails(configAddress);
  return config;
};

const updatePermission = async (configAddress, countryID, walletTypes, options, callback) => {
  isAddress({ configAddress, from: options.from });
  isInteger({ countryID });
  isArray({ walletTypes });
  isFunction({ callback });
  const instance = createInstance(ABI.updatePermission, configAddress);
  const action = await errorHandler(
    instance.methods.updatePermissionByCountry(countryID, walletTypes)
  );

  await signedTX({
    data: action.encodeABI(),
    from: options.from,
    to: configAddress,
    privateKey: options.privateKey,
    gasPrice: options.gasPrice,
    gasLimit: options.gasLimit,
    callback
  });
};

module.exports = {
  getConfig,
  getConfigDirectly,
  updatePermission
};
