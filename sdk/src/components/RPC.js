const Asset = require("./Asset");
const Config = require("./Config");
const SCRegistry = require("./SCRegistry");
const RPC = require("../ABI/RPC");
const ERC20 = require("../ABI/ERC20Mintable");
const { createInstance } = require("../helpers/createInstance");
const signedTX = require("../helpers/signedTX");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const utils = require("../utils");
const detectSymbol = require("../helpers/detectSymbol");

const estimateTX = async (value, buyAddress, sellAddress) => {
  const assetSymbol = await detectSymbol(buyAddress);
  const currencySymbol = await detectSymbol(sellAddress);
  const assetPrice = await Asset.getAssetPrice(buyAddress);
  const { entryFee, platformFee } = await Config.getConfig(buyAddress);
  const currencyPrice = await SCRegistry.getAssetRate(sellAddress);
  const currencyInUSD = currencyPrice * value;
  const feesAmount = (currencyInUSD * (entryFee + platformFee)) / 100;
  const remaining = currencyInUSD - feesAmount;
  const willMint = utils.toFixed(remaining / assetPrice);
  const fees = utils.toFixed(feesAmount / currencyPrice);
  const amount = utils.toFixed(remaining / currencyPrice);

  return {
    [assetSymbol]: willMint,
    [currencySymbol]: {
      fees,
      amount
    }
  };
};

const checkBeforeBuy = async (value, buyAddress, sellAddress, options) => {
  this.asset = createInstance(ERC20.abi, buyAddress);
  this.currency = createInstance(ERC20.abi, sellAddress);
  const balance = await this.currency.methods.balanceOf(options.from).call();
  if (balance < value) {
    Error({ name: "transaction", message: "Not enough funds on balance" });
  }
};

const buyAsset = async (value, buyAddress, sellAddress, options) => {
  await checkBeforeBuy(value, buyAddress, sellAddress, options);
  const RPCAddress = await Asset.getRPCAddress(buyAddress);
  const instance = createInstance(RPC.abi, RPCAddress);
  const action = instance.methods.buyAsset(utils.toWei(value), sellAddress);

  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: RPCAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit
    })
  );

  const spendRawEvents = await this.currency.getPastEvents("Transfer", {
    filter: { from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [manager, platform, spend] = spendRawEvents.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
  });

  const receivedRawEvents = await this.asset.getPastEvents("Transfer", {
    filter: { to: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [received] = receivedRawEvents.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
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
  this.TUSDAddress = await SCRegistry.getAddress("TUSD");
  this.AIVAddress = await SCRegistry.getAddress("AIV");
  this.asset = createInstance(ERC20.abi, assetAddress);
  this.TUSD = createInstance(ERC20.abi, this.TUSDAddress);
  this.AIV = createInstance(ERC20.abi, this.AIVAddress);
  const balance = await this.asset.methods.balanceOf(options.from).call();
  if (balance < value) {
    Error({ name: "transaction", message: "Not enough funds on balance" });
  }
};

const sellAsset = async (value, assetAddress, options) => {
  await checkBeforeSell(value, assetAddress, options);
  const RPCAddress = await Asset.getRPCAddress(assetAddress);
  const instance = createInstance(RPC.abi, RPCAddress);
  const action = instance.methods.sellAsset(utils.toWei(value));

  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: RPCAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit
    })
  );

  const spendRawEvents = await this.asset.getPastEvents("Transfer", {
    filter: { from: options.from, to: utils.ZERO_ADDRESS },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [spend] = spendRawEvents.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
  });

  const receivedRawEvents = await this.TUSD.getPastEvents("Transfer", {
    filter: { to: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [received] = receivedRawEvents.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
  });

  const feesRawEvents = await this.AIV.getPastEvents("Transfer", {
    filter: { from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [manager, platform] = feesRawEvents.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
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
  estimateTX,
  sellAsset
};
