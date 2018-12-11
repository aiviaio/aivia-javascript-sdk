const ERC20 = require("../ABI/ERC20Mintable");
const { createInstance, getProvider } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const signedTX = require("../helpers/signedTX");
const utils = require("../utils");

const getBalance = async (wallet, address) => {
  if (address && utils.isAddress(address)) {
    const instance = createInstance(ERC20.abi, address);
    const balance = await errorHandler(await instance.methods.balanceOf(wallet).call());
    return utils.fromWei(balance);
  }
  const web3 = getProvider();

  return utils.fromWei(await web3.eth.getBalance(wallet));
};

const totalSupply = async address => {
  const instance = createInstance(ERC20.abi, address);
  const total = await errorHandler(await instance.methods.totalSupply().call());
  return utils.fromWei(total);
};

const allowance = async (address, owner, spender) => {
  const instance = createInstance(ERC20.abi, address);
  const value = await errorHandler(await instance.methods.allowance(owner, spender).call());
  return utils.fromWei(value);
};

const approve = async (address, spender, value, options) => {
  const instance = createInstance(ERC20.abi, address);
  const action = instance.methods.approve(spender, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: address,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit
    })
  );

  const Events = await instance.getPastEvents("Approval", {
    filter: { to: address, from: options.from },
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

const mint = async (value, walletAddress, assetAddress, options) => {
  const instance = createInstance(ERC20.abi, assetAddress);
  const action = instance.methods.mint(walletAddress, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: assetAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit
    })
  );

  const Events = await instance.getPastEvents("Transfer", {
    filter: { to: walletAddress, from: utils.ZERO_ADDRESS },
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

/**
 *
 * @param {String} address Asset address
 * @param {String} wallet ERC20 wallet address
 * @param {Float} value value
 * @param {Object} options { from, privateKey, gasPrice}
 * @param {String} options.from,
 * @param {String} options.privateKey,
 * @param {Integer} options.gasPrice
 */
const transfer = async (contractAddress, wallet, value, options, callback) => {
  const instance = createInstance(ERC20.abi, contractAddress);
  const action = instance.methods.transfer(wallet, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: contractAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );

  const Events = await instance.getPastEvents("Transfer", {
    filter: { to: wallet, from: options.from },
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

const transferETH = async (to, value, options, callback) => {
  await errorHandler(
    signedTX({
      data: undefined,
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
