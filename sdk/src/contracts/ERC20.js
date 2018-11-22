const ERC20 = require("../ABI/ERC20Mintable");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const signedTX = require("../helpers/signedTX");
const utils = require("../utils");

const getBalance = async (address, wallet) => {
  this.instance = createInstance(ERC20.abi, address, this);
  const balance = await errorHandler(
    await this.instance.methods.balanceOf(wallet).call()
  );
  return utils.fromWei(balance);
};

const mint = async (value, walletAddress, assetAddress, options) => {
  this.instance = createInstance(ERC20.abi, assetAddress, this);
  const action = this.instance.methods.mint(walletAddress, utils.toWei(value));
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

  const Events = await this.currency.getPastEvents("Transfer", {
    filter: { to: walletAddress, from: utils.ZERO_ADDRESS },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const Event = Events.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
  });
  console.info(Event);
};

module.exports = {
  getBalance,
  mint
};
