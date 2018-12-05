const Audit = require("../ABI/ProjectAudit");
const RPC_ABI = require("../ABI/RPC");
const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const AssetsRegistry = require("./AssetsRegistry");
const Config = require("./Config");
const signedTX = require("../helpers/signedTX");
const utils = require("../utils");

const getAddressWithKey = async key => {
  if (utils.is.not.string(key) && !utils.isAddress(key)) {
    Error({
      name: "params",
      message: "Acceptable parameters address or symbol token"
    });
  }

  if (utils.isAddress(key)) {
    return key;
  }
  const address = await errorHandler(AssetsRegistry.getAssetAddress(key));
  return address;
};

const getAuditDBAddress = async key => {
  const address = await getAddressWithKey(key);
  const { auditDB } = await errorHandler(Config.getConfig(address));
  return auditDB;
};

const getRPCAddress = async key => {
  const address = await getAddressWithKey(key);
  const { RPC } = await Config.getConfig(address);
  return RPC;
};

const getRate = async key => {
  const auditDB = await errorHandler(getAuditDBAddress(key));
  const instance = createInstance(Audit.abi, auditDB);
  const price = await errorHandler(instance.methods.getLastPrice().call());
  return utils.fromWei(price);
};

const updateRate = async (address, rate, timestamp, checksum, options) => {
  const auditDB = await errorHandler(getAuditDBAddress(address));
  const instance = createInstance(Audit.abi, auditDB);
  const action = await errorHandler(
    instance.methods.updateRate(utils.toWei(rate), timestamp, utils.toHex(checksum))
  );

  const transaction = signedTX({
    data: action.encodeABI(),
    from: options.from,
    to: auditDB,
    privateKey: options.privateKey,
    gasPrice: options.gasPrice,
    gasLimit: options.gasLimit
  });

  const { blockNumber } = await errorHandler(transaction);

  const Events = await instance.getPastEvents("updateAudit", {
    filter: { to: auditDB, from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [Event] = Events.map(event => {
    const { returnValues } = event;
    const [_price, _auditor] = Object.values(returnValues);
    return {
      rate: utils.fromWei(_price),
      auditor: _auditor
    };
  });

  return Event;
};

const NET = async key => {
  const auditDB = await errorHandler(getAuditDBAddress(key));
  const instance = createInstance(Audit.abi, auditDB);
  const value = await errorHandler(instance.methods.NET().call());
  return utils.fromWei(value);
};

const deltaNET = async key => {
  const auditDB = await errorHandler(getAuditDBAddress(key));
  const instance = createInstance(Audit.abi, auditDB);
  const value = await errorHandler(instance.methods.deltaNET().call());
  return utils.fromWei(value);
};

const getInvestorsCount = async address => {
  if (!utils.isAddress(address)) {
    Error({
      name: "params",
      message: "'address' is not valid address"
    });
  }
  const RPC = await errorHandler(getRPCAddress(address));
  const instance = createInstance(RPC_ABI.abi, RPC);
  const investors = await errorHandler(instance.methods.getInvestorsCount().call());
  return Number(investors);
};

module.exports = {
  getRate,
  getAuditDBAddress,
  getRPCAddress,
  getInvestorsCount,
  updateRate,
  deltaNET,
  NET
};
