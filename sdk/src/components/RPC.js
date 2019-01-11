const Asset = require("./Asset");
const SCRegistry = require("./SCRegistry");
const ERC20 = require("./ERC20");
const Config = require("./Config");
const RPC = require("../ABI/RPC");
const ERC20ABI = require("../ABI/ERC20Mintable").abi;
const { createInstance } = require("../helpers/createInstance");
const signedTX = require("../helpers/signedTX");
const {
  errorHandler,
  isNumber,
  isAddress
} = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const utils = require("../utils");
const { estimateTX } = require("../helpers/estimateTX");

const storage = {};

const createCurrenciesInstances = async () => {
  storage.TUSDAddress =
    storage.TUSDAddress || (await SCRegistry.getAddress("TUSD"));
  storage.AIVAddress =
    storage.AIVAddress || (await SCRegistry.getAddress("AIV"));
  storage.TUSD = storage.TUSD || createInstance(ERC20ABI, storage.TUSDAddress);
  storage.AIV = storage.AIV || createInstance(ERC20ABI, storage.AIVAddress);
};
/**
 * @module Buy/Sell
 * @typicalname SDK.trade
 */

/**
 * the method by which you can first check the parameters before buy
 * @param {number} value the amount of the asset that
 * will be exchanged for the assets you want to buy
 * @param {address} assetAddress asset address that will be bought
 * @param {address} currencyAddress address of the asset to be sold
 * @param {address} from wallet address
 * @returns {true|error};
 */
exports.checkBeforeBuy = async (value, assetAddress, currencyAddress, from) => {
  isNumber({ value });
  isAddress({ assetAddress, currencyAddress, from });
  await createCurrenciesInstances();
  storage.asset = createInstance(ERC20ABI, assetAddress);
  storage.currency = createInstance(ERC20ABI, currencyAddress);
  const balance = await storage.currency.methods.balanceOf(from).call();
  if (balance < Number(value)) {
    Error({ name: "transaction", message: "Not enough funds on balance" });
  }
  return true;
};

/**
 * purchase of tokens
 * @param {number} value the amount of the asset that
 * will be exchanged for the assets you want to buy
 * @param {address} assetAddress asset address that will be bought
 * @param {address} currencyAddress address of the asset to be sold
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {spend, received, fees: { manager, platform } }
 */

exports.buyAsset = async (
  value,
  assetAddress,
  currencyAddress,
  options,
  callback,
  estimate
) => {
  await module.exports.checkBeforeBuy(
    value,
    assetAddress,
    currencyAddress,
    options.from
  );
  const RPCAddress = await Asset.getRPCAddress(assetAddress);
  const instance = createInstance(RPC.abi, RPCAddress);
  const action = instance.methods.buyAsset(utils.toWei(value), currencyAddress);
  const { custodian } = await Config.getConfig(assetAddress);
  if (!estimate) {
    if (currencyAddress === storage.TUSDAddress) {
      try {
        await ERC20.approve(storage.TUSDAddress, RPCAddress, value, options);
      } catch (error) {
        Error({
          name: "transaction",
          message: "Not enough funds or not allowed to withdraw them"
        });
      }
    }
  }

  const transaction = signedTX({
    data: action,
    from: options.from,
    to: RPCAddress,
    privateKey: options.privateKey,
    gasPrice: options.gasPrice,
    gasLimit: options.gasLimit,
    callback,
    action: "trade",
    estimate
  });

  const { blockNumber } = await errorHandler(transaction);

  const feesRawEvents = await storage.AIV.getPastEvents("Transfer", {
    filter: { from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [manager, platform] = feesRawEvents.map(event => {
    const { returnValues } = event;
    return utils.fromWei(returnValues.value);
  });

  const spendRawEvents = await storage.currency.getPastEvents("Transfer", {
    filter: { from: options.from, to: custodian },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [spend] = spendRawEvents.map(event => {
    const { returnValues } = event;
    return utils.fromWei(returnValues.value);
  });

  const receivedRawEvents = await storage.asset.getPastEvents("Transfer", {
    filter: { to: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [received] = receivedRawEvents.map(event => {
    const { returnValues } = event;
    return utils.fromWei(returnValues.value);
  });

  return {
    spend,
    received,
    fees: {
      manager,
      platform
    }
  };
};

/**
 * the method by which you can first check the parameters before sell
 * @param {number} value the amount of the asset that  will be sold
 * @param {address} assetAddress asset address that will be sold
 * @param {object} options
 * @param {address} options.address wallet address
 * @returns {true|error};
 */

exports.checkBeforeSell = async (value, assetAddress, from) => {
  isNumber({ value });
  isAddress({ assetAddress, from });
  await createCurrenciesInstances();
  storage.asset = createInstance(ERC20ABI, assetAddress);
  const balance = await storage.asset.methods.balanceOf(from).call();
  if (balance < Number(value)) {
    Error({ name: "transaction", message: "Not enough funds on balance" });
  }
  return true;
};

/**
 * sale of tokens
 * @param {number} value the amount of the asset that will be sold
 * @param {address} assetAddress asset address that will be sold
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {spend, received, fees: { manager, platform } }
 */
exports.sellAsset = async (
  value,
  assetAddress,
  options,
  callback,
  estimate
) => {
  await module.exports.checkBeforeSell(value, assetAddress, options.from);
  const RPCAddress = await Asset.getRPCAddress(assetAddress);
  const instance = createInstance(RPC.abi, RPCAddress);
  const action = instance.methods.sellAsset(utils.toWei(value));

  const transaction = signedTX({
    data: action,
    from: options.from,
    to: RPCAddress,
    privateKey: options.privateKey,
    gasPrice: options.gasPrice,
    gasLimit: options.gasLimit,
    callback,
    action: "trade",
    estimate
  });

  const { blockNumber } = await errorHandler(transaction);

  const spendRawEvents = await storage.asset.getPastEvents("Transfer", {
    filter: { from: options.from, to: utils.ZERO_ADDRESS },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [spend] = spendRawEvents.map(event => {
    const { returnValues } = event;
    return utils.fromWei(returnValues.value);
  });

  const receivedRawEvents = await storage.TUSD.getPastEvents("Transfer", {
    filter: { to: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [received] = receivedRawEvents.map(event => {
    const { returnValues } = event;
    return utils.fromWei(returnValues.value);
  });

  const feesRawEvents = await storage.AIV.getPastEvents("Transfer", {
    filter: { from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [manager, platform] = feesRawEvents.map(event => {
    const { returnValues } = event;
    return utils.fromWei(returnValues.value);
  });

  return {
    spend,
    received,
    fees: {
      manager,
      platform
    }
  };
};

/**
 *
 * @param {number} value the amount of the asset
 * @param {address} assetAddress asset address
 * @param {address=} currencyAddress currency address
 * @returns {estimate};
 */

exports.estimate = (value, assetAddress, currencyAddress) =>
  estimateTX(value, assetAddress, currencyAddress);
