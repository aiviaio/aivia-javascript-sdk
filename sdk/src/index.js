const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");

module.exports = function SDK() {
  this.getProxyAddress = () => EntryPoint.getProxyAddress();
  this.getContractAddress = (name, version) =>
    Proxy.getContractAddress(name, version);
};
