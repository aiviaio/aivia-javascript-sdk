const Audit = require("../ABI/ProjectAudit");
const RPC_ABI = require("../ABI/RPC");
const { createInstance } = require("../helpers/createInstance");
const {
  errorHandler,
  isAddressOrSymbol,
  isAddress,
  isString,
  isNumber
} = require("../helpers/errorHandler");
const AssetsRegistry = require("./AssetsRegistry");
const Config = require("./Config");
const signedTX = require("../helpers/signedTX");
const utils = require("../utils");

const getAddressWithKey = async addressOrSymbol => {
  isAddressOrSymbol(addressOrSymbol);

  if (utils.isAddress(addressOrSymbol)) {
    return addressOrSymbol;
  }
  const address = await errorHandler(AssetsRegistry.getAssetAddress(addressOrSymbol));
  return address;
};

const getAuditDBAddress = async addressOrSymbol => {
  isAddressOrSymbol(addressOrSymbol);
  const address = await getAddressWithKey(addressOrSymbol);
  const { auditDB } = await errorHandler(Config.getConfig(address));
  return auditDB;
};

const getRPCAddress = async addressOrSymbol => {
  isAddressOrSymbol(addressOrSymbol);
  const address = await getAddressWithKey(addressOrSymbol);
  const { RPC } = await Config.getConfig(address);
  return RPC;
};

const getRate = async addressOrSymbol => {
  isAddressOrSymbol(addressOrSymbol);
  const auditDB = await errorHandler(getAuditDBAddress(addressOrSymbol));
  const instance = createInstance(Audit.abi, auditDB);
  const price = await errorHandler(instance.methods.getLastPrice().call());
  return utils.fromWei(price);
};

const updateRate = async (address, AUM, checksum, options) => {
  isAddress(address);
  isNumber(AUM, "AUM");
  isString(checksum, "checksum");
  isAddress(options.from, "from");
  const _AUM = AUM < 0 ? 0 : utils.toWei(AUM);
  const auditDB = await errorHandler(getAuditDBAddress(address));
  const instance = createInstance(Audit.abi, auditDB);
  const timestamp = Math.floor(Date.now() / 1000);
  const action = await errorHandler(
    instance.methods.updateRate(_AUM, timestamp, utils.toHex(checksum))
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

const NET = async addressOrSymbol => {
  isAddressOrSymbol(addressOrSymbol);
  const auditDB = await errorHandler(getAuditDBAddress(addressOrSymbol));
  const instance = createInstance(Audit.abi, auditDB);
  const value = await errorHandler(instance.methods.NET().call());
  return utils.toFixed(utils.fromWei(value));
};

const getInvestorsCount = async address => {
  isAddress(address);
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
  NET
};
