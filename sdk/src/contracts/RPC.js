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

const estimateTX = async (value, assetAddress, currencyAddress) => {
  const assetSymbol = await detectSymbol(assetAddress);
  const currencySymbol = await detectSymbol(currencyAddress);
  const assetPrice = await Asset.getAssetPrice(assetAddress);
  const { entryFee, platformFee } = await Config.getConfig(assetAddress);
  const currencyPrice = await SCRegistry.getAssetRate(currencyAddress);
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

const checkTX = async (value, assetAddress, currencyAddress, options) => {
  this.asset = createInstance(ERC20.abi, assetAddress, this, "asset");
  this.currency = createInstance(ERC20.abi, currencyAddress, this, "currency");
  const balance = await this.currency.methods.balanceOf(options.from).call();
  if (balance < value) {
    Error({ name: "transaction", message: "Not enough funds on balance" });
  }
};

const buyAsset = async (value, assetAddress, currencyAddress, options) => {
  await checkTX(value, assetAddress, currencyAddress, options);
  const RPCAddress = await Asset.getRPCAddress(assetAddress);
  this.instance = createInstance(RPC.abi, RPCAddress, this);
  const buyAction = this.instance.methods.buyAsset(
    utils.toWei(value),
    currencyAddress
  );

  const { blockNumber } = await errorHandler(
    signedTX({
      data: buyAction.encodeABI(),
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
