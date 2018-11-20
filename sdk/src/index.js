const config = require("./config");
const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");
const Deployer = require("./contracts/Deployer");
const Tokens = require("./contracts/Tokens");
const Config = require("./contracts/Config");
const Projects = require("./contracts/Projects");

function SDK(ENTRY_POINT, HTTP_PROVIDER = "http://127.0.0.1:8545") {
  config.HTTP_PROVIDER = HTTP_PROVIDER;
  config.ENTRY_POINT = ENTRY_POINT;

  this.utils = {
    isDeployer: address => Proxy.isDeployer(address),
    isAuditor: (address, type) => Proxy.isAuditor(address, type)
  };

  this.getProxyAddress = () => EntryPoint.getProxyAddress();
  this.getRegistryAddress = key => Proxy.getRegistryAddress(key);

  this.token = {
    getList: () => Tokens.getTokensList(),
    getConfig: address => Config.getConfig(address)
  };

  this.project = {
    getList: () => Projects.getProjectsList(),
    getConfig: address => Config.getConfig(address)
  };

  this.deployProject = (type, params, options) =>
    Deployer.deployProject(type, params, options);
}

module.exports = SDK;
