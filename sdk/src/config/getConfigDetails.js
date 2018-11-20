const OpenEnd = require("./OpenEnd");
const Config = require("../ABI/ProjectConfig");
const createInstance = require("../helpers/createInstance");
const utils = require("../utils");

module.exports = async configAddress => {
  this.instance = createInstance(Config.abi, configAddress, this);
  const type = await this.instance.methods
    .getConstUint(utils.toHex("type"))
    .call();

  const list = {
    1: await OpenEnd(this.instance)
  };
  return list[type];
};
