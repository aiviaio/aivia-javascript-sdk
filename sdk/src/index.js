const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");

module.exports = function SDK() {
  // entry point
  this.getProxyAddress = () => EntryPoint.getProxyAddress();
  // Contract Registry
  this.getContractAddress = (name, version) =>
    Proxy.getContractAddress(name, version);
  // TPL Registry
  this.getUserDetails = address => Proxy.getUserDetails(address);
  this.getUsersList = () => Proxy.getUsersList();
  // Auditors Registry
  this.getAuditorDetails = address => Proxy.getAuditorDetails(address);
  this.getAuditorsList = () => Proxy.getAuditorsList();
  this.isAuditor = address => Proxy.isAuditor(address);
};
