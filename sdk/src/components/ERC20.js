const ERC20 = require("../ABI/ERC20Mintable");
const { createInstance, getProvider } = require("../helpers/createInstance");
const {
  errorHandler,
  isAddress,
  isNumber,
  isFunction,
  isString
} = require("../helpers/errorHandler");
const signedTX = require("../helpers/signedTX");
const utils = require("../utils");

const getBalance = async (wallet, assetAddress) => {
  isAddress({ wallet });

  if (assetAddress) {
    isAddress({ assetAddress });
  }

  if (assetAddress) {
    const instance = createInstance(ERC20.abi, assetAddress);
    const balance = await errorHandler(await instance.methods.balanceOf(wallet).call());
    return utils.fromWei(balance);
  }
  const web3 = getProvider();
  return utils.fromWei(await web3.eth.getBalance(wallet));
};

const totalSupply = async assetAddress => {
  isAddress({ assetAddress });
  const instance = createInstance(ERC20.abi, assetAddress);
  const total = await errorHandler(await instance.methods.totalSupply().call());
  return utils.fromWei(total);
};

const allowance = async (assetAddress, owner, spender) => {
  isAddress({ assetAddress, owner, spender });
  const instance = createInstance(ERC20.abi, assetAddress);
  const value = await errorHandler(await instance.methods.allowance(owner, spender).call());
  return utils.fromWei(value);
};

const approve = async (assetAddress, spender, value, options, callback) => {
  isAddress({ assetAddress, spender });
  isNumber({ value });
  const instance = createInstance(ERC20.abi, assetAddress);
  const action = instance.methods.approve(spender, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: assetAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );

  const Events = await instance.getPastEvents("Approval", {
    filter: { to: assetAddress, from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [Event] = Events.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
  });

  return Event;
};

const mint = async (value, to, assetAddress, options, callback) => {
  isNumber({ value });
  isAddress({ assetAddress, to });
  const instance = createInstance(ERC20.abi, assetAddress);
  const action = instance.methods.mint(to, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: assetAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );

  const Events = await instance.getPastEvents("Transfer", {
    filter: { to, from: utils.ZERO_ADDRESS },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [Event] = Events.map(event => {
    const { returnValues } = event;
    const [from, _to, _value] = Object.values(returnValues);
    return {
      from,
      to: _to,
      value: utils.fromWei(_value)
    };
  });

  return Event;
};

const transfer = async (to, value, assetAddress, options, callback) => {
  isNumber({ value });
  isAddress({ assetAddress, to, from: options.from });
  isString({ privateKey: options.privateKey });
  isFunction({ callback });
  const instance = createInstance(ERC20.abi, assetAddress);
  const action = instance.methods.transfer(to, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: assetAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );

  const Events = await instance.getPastEvents("Transfer", {
    filter: { to, from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [Event] = Events.map(event => {
    const { returnValues } = event;
    const [from, _to, _value] = Object.values(returnValues);
    return {
      from,
      to: _to,
      value: utils.fromWei(_value)
    };
  });

  return Event;
};

const transferETH = async (to, value, options, callback) => {
  isNumber({ value });
  isAddress({ to, from: options.from });
  isString({ privateKey: options.privateKey });
  isFunction({ callback });
  await errorHandler(
    signedTX({
      from: options.from,
      to,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback,
      value: utils.numberToHex(value)
    })
  );
};

module.exports = {
  getBalance,
  totalSupply,
  mint,
  allowance,
  approve,
  transfer,
  transferETH
};
