const EntryPoint = require("./contracts/EntryPoint");

module.exports = function SDK() {
  this.getProxyAddress = () => EntryPoint.getProxyAddress();
};
