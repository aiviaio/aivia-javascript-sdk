const Asset = require("./Asset");
const SCRegistry = require("./SCRegistry");
const ERC20 = require("./ERC20");
const Config = require("./Config");
const RPC = require("../ABI/RPC");
const ERC20ABI = require("../ABI/ERC20Mintable").abi;
const { createInstance } = require("../helpers/createInstance");
const signedTX = require("../helpers/signedTX");
const { errorHandler, isNumber, isAddress } = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const utils = require("../utils");

const storage = {};

const createCurrenciesInstances = async () => {
  storage.TUSDAddress = storage.TUSDAddress || (await SCRegistry.getAddress("TUSD"));
  storage.AIVAddress = storage.AIVAddress || (await SCRegistry.getAddress("AIV"));
  storage.TUSD = storage.TUSD || createInstance(ERC20ABI, storage.TUSDAddress);
  storage.AIV = storage.AIV || createInstance(ERC20ABI, storage.AIVAddress);
};

const checkBeforeBuy = async (value, assetAddress, currencyAddress, options) => {
  isNumber({ value });
  isAddress({ assetAddress, currencyAddress });
  await createCurrenciesInstances();
  storage.asset = createInstance(ERC20ABI, assetAddress);
  storage.currency = createInstance(ERC20ABI, currencyAddress);
  const balance = await storage.currency.methods.balanceOf(options.from).call();
  if (balance < Number(value)) {
    Error({ name: "transaction", message: "Not enough funds on balance" });
  }
};

const buyAsset = async (value, assetAddress, currencyAddress, options, callback) => {
  await checkBeforeBuy(value, assetAddress, currencyAddress, options);
  const RPCAddress = await Asset.getRPCAddress(assetAddress);
  const instance = createInstance(RPC.abi, RPCAddress);
  const action = instance.methods.buyAsset(utils.toWei(value), currencyAddress);
  const { custodian } = await Config.getConfig(assetAddress);
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

  const transaction = signedTX({
    data: action.encodeABI(),
    from: options.from,
    to: RPCAddress,
    privateKey: options.privateKey,
    gasPrice: options.gasPrice,
    gasLimit: options.gasLimit,
    callback
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
    fees: {
      manager,
      platform
    },
    received
  };
};

const checkBeforeSell = async (value, assetAddress, options) => {
  isNumber({ value });
  isAddress({ assetAddress });
  await createCurrenciesInstances();
  storage.asset = createInstance(ERC20ABI, assetAddress);
  const balance = await storage.asset.methods.balanceOf(options.from).call();
  if (balance < Number(value)) {
    Error({ name: "transaction", message: "Not enough funds on balance" });
  }
};

const sellAsset = async (value, assetAddress, options, callback) => {
  await checkBeforeSell(value, assetAddress, options);
  const RPCAddress = await Asset.getRPCAddress(assetAddress);
  const instance = createInstance(RPC.abi, RPCAddress);
  const action = instance.methods.sellAsset(utils.toWei(value));

  const transaction = signedTX({
    data: action.encodeABI(),
    from: options.from,
    to: RPCAddress,
    privateKey: options.privateKey,
    gasPrice: options.gasPrice,
    gasLimit: options.gasLimit,
    callback
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

module.exports = {
  buyAsset,
  sellAsset
};
