const utils = require("../utils");
const ABI = require("./utility-abi");
const { createInstance } = require("./createInstance");

module.exports = async address => {
  const _this = {};
  _this.instance = createInstance(ABI.bytes32Symbol, address, _this);
  _this.symbol = utils.toUtf8(await _this.instance.methods.symbol().call());
  if (!_this.symbol.trim().length) {
    delete _this.instance;
    _this.instance = createInstance(ABI.stringSymbol, address, _this);
    _this.symbol = await _this.instance.methods.symbol().call();
  }
  return _this.symbol;
};
