const ERC20 = require("../ABI/ERC20Mintable");
const { createInstance, getProvider } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const signedTX = require("../helpers/signedTX");
const utils = require("../utils");

const getBalance = async (wallet, address) => {
  if (address && utils.isAddress(address)) {
    const instance = createInstance(ERC20.abi, address);
    const balance = await errorHandler(
      await instance.methods.balanceOf(wallet).call()
    );
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

module.exports = {
  getBalance,
  totalSupply,
  mint
};
