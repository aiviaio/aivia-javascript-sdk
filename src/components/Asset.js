const AUDIT_DB_ABI = require("../ABI/ProjectAudit");
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
/**
 * @module Asset
 * @typicalname SDK.asset
 */

const getAddressWithKey = async addressOrSymbol => {
  isAddressOrSymbol({ addressOrSymbol });

  if (utils.isAddress(addressOrSymbol)) {
    return addressOrSymbol;
  }
  const address = await errorHandler(
    AssetsRegistry.getAssetAddress(addressOrSymbol)
  );
  return address;
};

/**
 * returns AuditDB address
 * @param {string|address} addressOrSymbol
 * @returns {AuditDBAddress} AuditDB address
 */
exports.getAuditDBAddress = async addressOrSymbol => {
  isAddressOrSymbol({ addressOrSymbol });
  const address = await getAddressWithKey(addressOrSymbol);
  const { auditDB } = await errorHandler(Config.getConfig(address));
  return auditDB;
};

/**
 * returns asset RPC address
 * @param {string|address} addressOrSymbol
 * @returns {RPCAddress} RPC address
 */
exports.getRPCAddress = async addressOrSymbol => {
  isAddressOrSymbol({ addressOrSymbol });
  const address = await errorHandler(getAddressWithKey(addressOrSymbol));
  const { RPC } = await Config.getConfig(address);
  return RPC;
};

/**
 * returns asset rate by address or symbol
 * @param {string|address} addressOrSymbol
 * @returns {rate} current(last) rate
 */
exports.getRate = async addressOrSymbol => {
  isAddressOrSymbol({ addressOrSymbol });
  const auditDB = await errorHandler(
    module.exports.getAuditDBAddress(addressOrSymbol)
  );
  const instance = createInstance(AUDIT_DB_ABI, auditDB);
  const price = await errorHandler(instance.methods.getLastPrice().call());
  return utils.fromWei(price);
};

/**
 * function to update the price of the asset rate
 * @access only auditors
 * @param {address} assetAddress asset address
 * @param {number} AUM project total aum
 * @param {string} checksum md5 checksum
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @returns {event} transaction event {rate, auditor}
 */
exports.updateRate = async (
  assetAddress,
  AUM,
  checksum,
  options,
  callback,
  estimate
) => {
  isAddress({ assetAddress });
  isNumber({ AUM });
  isString({ checksum });
  const _AUM = AUM < 0 ? 0 : utils.toWei(AUM);
  const auditDB = await errorHandler(
    module.exports.getAuditDBAddress(assetAddress)
  );
  const instance = createInstance(AUDIT_DB_ABI, auditDB);
  const timestamp = Math.floor(Date.now() / 1000);
  const action = await errorHandler(
    instance.methods.updateRate(_AUM, timestamp, utils.toHex(checksum))
  );

  const transaction = signedTX({
    data: action,
    from: options.from,
    to: auditDB,
    privateKey: options.privateKey,
    gasPrice: options.gasPrice,
    gasLimit: options.gasLimit,
    nonce: options.nonce,
    callback,
    estimate
  });

  const { blockNumber } = await errorHandler(transaction);

  const Events = await errorHandler(
    instance.getPastEvents("updateAudit", {
      filter: { to: auditDB, from: options.from },
      fromBlock: blockNumber,
      toBlock: "latest"
    })
  );

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

/**
 * returns asset NET by address or symbol
 * @param {string|address} addressOrSymbol
 * @returns {NET}
 */
exports.NET = async addressOrSymbol => {
  isAddressOrSymbol({ addressOrSymbol });
  const auditDB = await errorHandler(
    module.exports.getAuditDBAddress(addressOrSymbol)
  );
  const instance = createInstance(AUDIT_DB_ABI, auditDB);
  const value = await errorHandler(instance.methods.NET().call());
  return utils.toFixed(utils.fromWei(value));
};
/**
 * returns asset investors count by address
 * @param {address} addressOrSymbol
 * @returns {investors}
 */
exports.getInvestors = async assetAddress => {
  isAddress({ assetAddress });
  const RPC = await errorHandler(module.exports.getRPCAddress(assetAddress));
  const instance = createInstance(RPC_ABI, RPC);
  const investors = await errorHandler(
    instance.methods.getInvestorsCount().call()
  );
  return Number(investors);
};

/**
 * returns config by config address
 * @param {string|address} assetAddress
 * @returns {object} config
 */
exports.getConfig = async assetAddress => {
  isAddressOrSymbol({ assetAddress });
  const config = await Config.getConfig(assetAddress);
  return config;
};
