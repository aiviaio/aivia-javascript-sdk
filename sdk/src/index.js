const EntryPoint = require("./contracts/EntryPoint");

module.exports = function SDK() {
  this.getProxyAddress = () => EntryPoint.getProxyAddress();

  this.setProxyAddress = (address, options) =>
    EntryPoint.setProxyAddress(address, options);
};
