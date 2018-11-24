const TPLRegistry = require("../ABI/TPLRegistry");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");

const getAssetsList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("tpl");
  this.instance = createInstance(TPLRegistry.abi, registryAddress, this);
};

module.exports = {
  getAssetsList
};
