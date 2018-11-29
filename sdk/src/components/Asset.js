const Audit = require("../ABI/ProjectAudit");
const RPC_ABI = require("../ABI/RPC");
const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const AssetsRegistry = require("./AssetsRegistry");
const Config = require("./Config");
const utils = require("../utils");

const getAuditDBAddress = async key => {
  if (utils.is.not.string(key) && !utils.isAddress(key)) {
    Error({
      name: "params",
      message: "Acceptable parameters address or symbol token"
    });
  }
  let address = null;
  if (utils.isAddress(key)) {
    address = key;
  } else {
    address = await errorHandler(AssetsRegistry.getAssetAddress(key));
  }
  const { auditDB } = await errorHandler(Config.getConfig(address));
  return auditDB;
};

const getRPCAddress = async key => {
  if (utils.is.not.string(key) && !utils.isAddress(key)) {
    Error({
      name: "params",
      message: "Acceptable parameters address or symbol token"
    });
  }

  let address = null;
  if (utils.isAddress(key)) {
    address = key;
  } else {
    address = await errorHandler(AssetsRegistry.getAssetAddress(key));
  }
  const { RPC } = await Config.getConfig(address);
  return RPC;
};

const getRate = async key => {
  const auditDB = await errorHandler(getAuditDBAddress(key));
  const instance = createInstance(Audit.abi, auditDB);
  const price = await errorHandler(instance.methods.getLastPrice().call());
  return utils.fromWei(price);
};

const getInvestorsCount = async address => {
  const RPC = await errorHandler(getRPCAddress(address));
  const instance = createInstance(RPC_ABI.abi, RPC);
  const investors = await errorHandler(
    instance.methods.getInvestorsCount().call()
  );
  return investors;
};

module.exports = {
  getRate,
  getAuditDBAddress,
  getRPCAddress,
  getInvestorsCount
};
