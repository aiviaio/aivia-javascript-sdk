const utils = require("../utils");
const ABI = require("./utility-abi");
const { createInstance } = require("./createInstance");

module.exports = async assetAddress => {
  let symbol = "";
  let instance = null;
  instance = createInstance(ABI.bytes32Symbol, assetAddress);
  symbol = utils.toUtf8(await instance.methods.symbol().call());
  if (!symbol.trim().length) {
    instance = createInstance(ABI.stringSymbol, assetAddress);
    symbol = await instance.methods.symbol().call();
  }
  return symbol;
};
