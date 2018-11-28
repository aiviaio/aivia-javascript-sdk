const PlatformRegistry = require("../ABI/PlatformRegistry");
const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const utils = require("../utils");
const Proxy = require("./Proxy");

const getPlatformWallet = async () => {
  const registryAddress = await Proxy.getRegistryAddress("platform");
  this.instance = createInstance(PlatformRegistry.abi, registryAddress, this);
  const address = await errorHandler(
    this.instance.methods.getAddress(utils.toHex("platformWallet")).call()
  );
  return address;
};

const getPlatformToken = async () => {
  const registryAddress = await Proxy.getRegistryAddress("platform");
  this.instance = createInstance(PlatformRegistry.abi, registryAddress, this);
  const address = await errorHandler(
    this.instance.methods.getAddress(utils.toHex("platformToken")).call()
  );
  return address;
};

module.exports = {
  getPlatformWallet,
  getPlatformToken
};