const OpenEnd = require("./OpenEnd");
const Config = require("../ABI/ProjectConfig");
const { createInstance } = require("../helpers/createInstance");
const utils = require("../utils");

module.exports = async configAddress => {
  const instance = createInstance(Config.abi, configAddress);
  const type = await instance.methods.getConstUint(utils.toHex("type")).call();

  const list = {
    1: await OpenEnd(instance)
  };
  return list[type];
};
