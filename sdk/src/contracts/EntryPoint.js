const EntryPoint = require("../ABI/EntryPoint");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const config = require("../config");

const getProxyAddress = async () => {
  this.instance = createInstance(EntryPoint.abi, config.ENTRY_POINT, this);
  const address = await errorHandler(
    this.instance.methods.getProxyAddress().call()
  );
  return address;
};

module.exports = {
  getProxyAddress
};
