const config = require("./config");
const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");
const Deployer = require("./contracts/Deployer");
const Tokens = require("./contracts/Tokens");
const Projects = require("./contracts/Projects");

function SDK(ENTRY_POINT, HTTP_PROVIDER = "http://127.0.0.1:8545") {
  config.HTTP_PROVIDER = HTTP_PROVIDER;
  config.ENTRY_POINT = ENTRY_POINT;

  this.getProxyAddress = () => EntryPoint.getProxyAddress();
  this.getRegistryAddress = key => Proxy.getRegistryAddress(key);
  this.isDeployer = address => Proxy.isDeployer(address);
  this.isAuditor = (address, type) => Proxy.isAuditor(address, type);
  this.getTokensList = () => Tokens.getTokensList();
  this.getProjectsList = () => Projects.getProjectsList();

  this.deployProject = (type, params, options) =>
    Deployer.deployProject(type, params, options);
}

module.exports = SDK;
