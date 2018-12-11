const { createInstance } = require("../helpers/createInstance");
const { errorHandler } = require("../helpers/errorHandler");
const getConfigDetails = require("../config/getConfigDetails");
const ABI = require("../helpers/utility-abi");
const signedTX = require("../helpers/signedTX");

const getConfig = async address => {
  const instance = createInstance(ABI.config, address);
  const configAddress = await errorHandler(instance.methods.config().call());
  const config = await getConfigDetails(configAddress);
  return config;
};

const getConfigDirectly = async configAddress => {
  const config = await getConfigDetails(configAddress);
  return config;
};

const updatePermission = async (address, countryID, walletTypes, options, callback) => {
  const instance = createInstance(ABI.updatePermission, address);
  const action = await errorHandler(
    instance.methods.updatePermissionByCountry(countryID, walletTypes)
  );

  await signedTX({
    data: action.encodeABI(),
    from: options.from,
    to: address,
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
