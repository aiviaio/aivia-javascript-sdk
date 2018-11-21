const Token = require("./Asset");
const OpenEndRPC = require("../ABI/OpenEndRPC");
const ERC20 = require("../ABI/ERC20");
const createInstance = require("../helpers/createInstance");
const signedTX = require("../helpers/signedTX");
const errorHandler = require("../helpers/errorHandler");
const utils = require("../utils");

const buyAsset = async (value, tokenAddress, assetAddress, options) => {
  const RPC = await Token.getRPCAddress(tokenAddress);
  this.instance = createInstance(OpenEndRPC.abi, RPC, this);
  this.token = createInstance(ERC20.abi, assetAddress, this, "token");
  const balance = await this.token.methods.balanceOf(options.from).call();
  console.info(utils.fromWei(balance));
  const buyAction = this.instance.methods.buyToken(
    utils.toWei(value),
    assetAddress
  );
  const { blockNumber } = await errorHandler(
    signedTX({
      data: buyAction.encodeABI(),
      from: options.from,
      to: RPC,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit
    })
  );

  const rawEvents = await this.token.getPastEvents("Transfer", {
    filter: { from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const eventsAssets = rawEvents.map(event => {
    const { returnValues } = event;
    const [from, to, _value] = Object.values(returnValues);
    return {
      from,
      to,
      value: utils.fromWei(_value)
    };
  });
  console.info(eventsAssets);
};

module.exports = {
  buyAsset
};
