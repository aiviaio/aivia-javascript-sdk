const ENTRY_POINT_ABI = require("../ABI/EntryPoint");
const { createInstance } = require("../helpers/createInstance");
const { errorHandler } = require("../helpers/errorHandler");
const config = require("../config");

const getProxyAddress = async () => {
  const instance = createInstance(ENTRY_POINT_ABI, config.get("ENTRY_POINT"));
  const address = await errorHandler(instance.methods.getProxyAddress().call());
  return address;
};

module.exports = {
  getProxyAddress
};
