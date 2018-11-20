const Token = require("./Token");
const OpenEndRPC = require("../ABI/OpenEndRPC");
const ERC20 = require("../ABI/ERC20");
const createInstance = require("../helpers/createInstance");
const signedTX = require("../helpers/signedTX");
const errorHandler = require("../helpers/errorHandler");
const utils = require("../utils");

const buyToken = async (value, tokenAddress, assetAddress, options) => {
  const RPC = await Token.getRPCAddress(tokenAddress);
  this.instance = createInstance(OpenEndRPC.abi, RPC, this);
  this.token = createInstance(ERC20.abi, assetAddress, this, "token");
  // const balance = await this.token.methods.balanceOf(options.from).call();
  // console.info(utils.fromWei(balance));
  const buyAction = this.instance.methods.buyToken(
    utils.toWei(value),
    assetAddress
  );
  const buyActionABI = buyAction.encodeABI();
  const { blockNumber } = await errorHandler(
    signedTX(RPC, options, buyActionABI)
  );

  const events = await this.token.getPastEvents("Transfer", {
    filter: { from: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  console.info(events);
};

module.exports = {
  buyToken
};
