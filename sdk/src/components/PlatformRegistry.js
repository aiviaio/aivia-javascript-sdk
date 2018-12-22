const PlatformRegistry = require("../ABI/PlatformRegistry");
const { createInstance } = require("../helpers/createInstance");
const { errorHandler } = require("../helpers/errorHandler");
const utils = require("../utils");
const Proxy = require("./Proxy");

/**
 * @module Platform
 * @typicalname SDK.platform
 */

/**
 * returns platform wallet address
 * @returns {address}
 */
exports.getPlatformWallet = async () => {
  const registryAddress = await Proxy.getRegistryAddress("platform");
  const instance = createInstance(PlatformRegistry.abi, registryAddress);
  const address = await errorHandler(
    instance.methods.getAddress(utils.toHex("platformWallet")).call()
  );
  return address;
};

/**
 * returns platform token address
 * @returns {address}
 */
exports.getPlatformToken = async () => {
  const registryAddress = await Proxy.getRegistryAddress("platform");
  const instance = createInstance(PlatformRegistry.abi, registryAddress);
  const address = await errorHandler(
    instance.methods.getAddress(utils.toHex("platformToken")).call()
  );
  return address;
};
