const Asset = require("./Asset");
const ERC20 = require("./ERC20");
const Config = require("./Config");
const SCRegistry = require("./SCRegistry");
const RPC = require("../ABI/RPC");
const ERC20_ABI = require("../ABI/ERC20Mintable").abi;
const { createInstance } = require("../helpers/createInstance");
const signedTX = require("../helpers/signedTX");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const utils = require("../utils");
const detectSymbol = require("../helpers/detectSymbol");

const estimateTX = async (value, buyAddress, sellAddress) => {
  const assetSymbol = await detectSymbol(buyAddress);
  const currencySymbol = await detectSymbol(sellAddress);
  const assetPrice = await Asset.getRate(buyAddress);
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

const createCurrenciesInstances = async () => {
  this.TUSDAddress = this.TUSDAddress || (await SCRegistry.getAddress("TUSD"));
  this.AIVAddress = this.AIVAddress || (await SCRegistry.getAddress("AIV"));
  this.TUSD = this.TUSD || createInstance(ERC20_ABI, this.TUSDAddress);
  this.AIV = this.AIV || createInstance(ERC20_ABI, this.AIVAddress);
};

const checkBeforeBuy = async (value, buyAddress, sellAddress, options) => {
  await createCurrenciesInstances();
  this.asset = createInstance(ERC20_ABI, buyAddress);
  this.currency = createInstance(ERC20_ABI, sellAddress);
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

  if (sellAddress === this.TUSDAddress) {
    try {
      await ERC20.approve(this.TUSDAddress, RPCAddress, value, options);
    } catch (error) {
      Error({
        name: "transaction",
        message: "Not enough funds or not allowed to withdraw them"
      });
    }
  }

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

  const spendRawEvents = await this.currency.getPastEvents("Transfer", {
    filter: { from: options.from },
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
  await createCurrenciesInstances();
  this.asset = createInstance(ERC20_ABI, assetAddress);
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
