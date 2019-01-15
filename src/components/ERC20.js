const ERC20_ABI = require("../ABI/ERC20Mintable");
const { createInstance, getProvider } = require("../helpers/createInstance");
const {
  errorHandler,
  isAddress,
  isNumber,
  isFunction
} = require("../helpers/errorHandler");
const signedTX = require("../helpers/signedTX");
const utils = require("../utils");

/**
 * @module ERC20
 * @typicalname SDK.asset
 */

/**
 * returns asset balance by assetAddress or ETH balance
 * @param {address} wallet
 * @param {Address=} assetAddress
 * @returns {balance}
 */
exports.getBalance = async (wallet, assetAddress, isString) => {
  isAddress({ wallet });

  if (assetAddress) {
    isAddress({ assetAddress });
  }

  if (assetAddress) {
    const instance = createInstance(ERC20_ABI, assetAddress);
    const balance = await errorHandler(
      await instance.methods.balanceOf(wallet).call()
    );
    return utils.fromWei(balance, isString);
  }
  const web3 = getProvider();
  return utils.fromWei(
    await errorHandler(web3.eth.getBalance(wallet)),
    isString
  );
};

/**
 * returns asset totalSupply
 * @param {address} assetAddress
 * @return {totalSupply}
 */
exports.totalSupply = async assetAddress => {
  isAddress({ assetAddress });
  const instance = createInstance(ERC20_ABI, assetAddress);
  const total = await errorHandler(instance.methods.totalSupply().call());
  return utils.fromWei(total);
};

/**
 * returns amount approved by owner to spender
 * @param {address} assetAddress
 * @param {address} owner
 * @param {address} spender
 * @return {allowance}
 */
exports.allowance = async (assetAddress, owner, spender) => {
  isAddress({ assetAddress, owner, spender });
  const instance = createInstance(ERC20_ABI, assetAddress);
  const value = await errorHandler(
    await instance.methods.allowance(owner, spender).call()
  );
  return utils.fromWei(value);
};

/**
 * allows spender to manage a certain amount of assets
 * @param {address} assetAddress asset address
 * @param {address} spender spender wallet address
 * @param {number} value amount of asset
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {from, to, value}
 */
exports.approve = async (assetAddress, spender, value, options, callback) => {
  isAddress({ assetAddress, spender });
  isNumber({ value });
  const instance = createInstance(ERC20_ABI, assetAddress);
  const action = instance.methods.approve(spender, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action,
      from: options.from,
      to: assetAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );

  const Events = await errorHandler(
    instance.getPastEvents("Approval", {
      filter: { to: assetAddress, from: options.from },
      fromBlock: blockNumber,
      toBlock: "latest"
    })
  );

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
 * transfer ERC20 asset value to other address
 * @param {address} to wallet address
 * @param {number} value amount of asset
 * @param {address} assetAddress asset address
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {from, to, value}
 */

exports.transfer = async (
  to,
  value,
  assetAddress,
  options,
  callback,
  estimate
) => {
  isNumber({ value });
  isAddress({ assetAddress, to, from: options.from });
  isFunction({ callback });
  const instance = createInstance(ERC20_ABI, assetAddress);
  const action = instance.methods.transfer(to, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action,
      from: options.from,
      to: assetAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback,
      estimate
    })
  );

  const Events = await errorHandler(
    instance.getPastEvents("Transfer", {
      filter: { to, from: options.from },
      fromBlock: blockNumber,
      toBlock: "latest"
    })
  );

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

/**
 * transfer ETH value to other address
 * @param {address} to wallet address
 * @param {number} value amount of asset
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {from, to, value}
 */

exports.transferETH = async (to, value, options, callback, estimate) => {
  isNumber({ value });
  isAddress({ to, from: options.from });
  isFunction({ callback });
  const tx = await errorHandler(
    signedTX({
      from: options.from,
      to,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback,
      value: utils.numberToHex(value),
      estimate
    })
  );
  return tx;
};

/**
 * mint asset value to other wallet from contract owner
 * @param {number} value amount of asset
 * @param {address} to wallet address
 * @param {address} assetAddress asset address
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {from, to, value}
 */
exports.mint = async (value, to, assetAddress, options, callback) => {
  isNumber({ value });
  isAddress({ assetAddress, to });
  const instance = createInstance(ERC20_ABI, assetAddress);
  const action = instance.methods.mint(to, utils.toWei(value));
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action,
      from: options.from,
      to: assetAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );

  const Events = await errorHandler(
    instance.getPastEvents("Transfer", {
      filter: { to, from: utils.ZERO_ADDRESS },
      fromBlock: blockNumber,
      toBlock: "latest"
    })
  );

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
