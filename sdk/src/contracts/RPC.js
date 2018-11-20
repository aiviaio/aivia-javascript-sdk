const Token = require("./Token");
const OpenEndRPC = require("../ABI/OpenEndRPC");
const ERC20 = require("../ABI/ERC20");
const createInstance = require("../helpers/createInstance");
const sendSignedTransaction = require("../helpers/sendSignedTransaction");
const errorHandler = require("../helpers/errorHandler");

const buyToken = async (value, tokenAddress, assetAddress, options) => {
  const RPC = await Token.getRPCAddress(tokenAddress);
  this.instance = createInstance(OpenEndRPC.abi, RPC, this);
  this.token = createInstance(ERC20.abi, assetAddress, this, "token");
  // const balance = await this.token.methods.balanceOf(options.from).call();
  const buyAction = this.instance.methods.buyToken(value, assetAddress);
  const buyActionABI = buyAction.encodeABI();
  const { blockNumber } = await errorHandler(
    sendSignedTransaction(RPC, options, buyActionABI, value)
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
