const Audit = require("../ABI/ProjectAudit");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const utils = require("../utils");
const Tokens = require("./Tokens");
const Config = require("./Config");

const getAuditDBAddress = async key => {
  if (utils.is.not.string(key) && !utils.isAddress(key)) {
    Error({
      name: "params",
      message: "Acceptable parameters address or symbol token"
    });
  }
  if (utils.isAddress(key)) {
    this.address = key;
  } else {
    this.address = await errorHandler(Tokens.getTokenAddress(key));
  }
  const { auditDB } = await errorHandler(Config.getConfig(this.address));
  return auditDB;
};

const getRPCAddress = async key => {
  if (utils.is.not.string(key) && !utils.isAddress(key)) {
    Error({
      name: "params",
      message: "Acceptable parameters address or symbol token"
    });
  }
  if (utils.isAddress(key)) {
    this.address = key;
  } else {
    this.address = await errorHandler(Tokens.getTokenAddress(key));
  }
  const { RPC } = await errorHandler(Config.getConfig(this.address));
  return RPC;
};

const getTokenPrice = async key => {
  const auditDB = await errorHandler(getAuditDBAddress(key));
  this.instance = createInstance(Audit.abi, auditDB, this);
  const price = await errorHandler(this.instance.methods.getLastPrice().call());
  return utils.fromWei(price);
};

module.exports = {
  getTokenPrice,
  getAuditDBAddress,
  getRPCAddress
};
