const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const getConfigDetails = require("../config/getConfigDetails");
const ABI = require("../helpers/utility-abi");

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

module.exports = {
  getConfig,
  getConfigDirectly
};
