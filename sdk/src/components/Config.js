const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const getConfigDetails = require("../config/getConfigDetails");
const ABI = require("../helpers/utility-abi");

const getConfig = async address => {
  this.instance = createInstance(ABI.config, address, this);
  const configAddress = await errorHandler(
    this.instance.methods.config().call()
  );
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
