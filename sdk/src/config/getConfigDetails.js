const CryptoHedge = require("./CryptoHedge");
const Config = require("../ABI/ProjectConfig");
const { createInstance } = require("../helpers/createInstance");
const { errorHandler, isAddress } = require("../helpers/errorHandler");
const utils = require("../utils");

module.exports = async configAddress => {
  isAddress({ configAddress });
  const instance = createInstance(Config.abi, configAddress);
  const type = await errorHandler(instance.methods.getConstUint(utils.toHex("type")).call());
  const list = {
    1: await CryptoHedge(instance)
  };
  return list[type];
};
