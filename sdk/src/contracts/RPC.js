const Asset = require("./Asset");
const Config = require("./Config");
const SCRegistry = require("./SCRegistry");
const RPC = require("../ABI/RPC");
const ERC20 = require("../ABI/ERC20");
const createInstance = require("../helpers/createInstance");
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

const checkTX = async (value, buyAddress, sellAddress, options) => {
  this.asset = createInstance(ERC20.abi, buyAddress, this, "buy");
  this.currency = createInstance(ERC20.abi, sellAddress, this, "sell");
  const balance = await this.currency.methods.balanceOf(options.from).call();
  if (balance < value) {
    Error({ name: "transaction", message: "Not enough funds on balance" });
  }
};

const buyAsset = async (value, buyAddress, sellAddress, options) => {
  await checkTX(value, buyAddress, sellAddress, options);
  const RPCAddress = await Asset.getRPCAddress(buyAddress);
  this.instance = createInstance(RPC.abi, RPCAddress, this);
  const action = this.instance.methods.buyAsset(
    utils.toWei(value),
    sellAddress
  );

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

  const soldRawEvents = await this.currency.getPastEvents("Transfer", {
    filter: { from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const sold = soldRawEvents.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
  });

  const bothRawEvents = await this.asset.getPastEvents("Transfer", {
    filter: { to: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const both = bothRawEvents.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
  });

  return { sold, both };
};

module.exports = {
  buyAsset,
  estimateTX
};
