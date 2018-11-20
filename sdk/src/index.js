const config = require("./config");
const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");
const Deployer = require("./contracts/Deployer");
const Tokens = require("./contracts/Tokens");
const Token = require("./contracts/Token");
const Config = require("./contracts/Config");
const Projects = require("./contracts/Projects");
const Assets = require("./contracts/Assets");

function SDK(ENTRY_POINT, HTTP_PROVIDER = "http://127.0.0.1:8545") {
  config.HTTP_PROVIDER = HTTP_PROVIDER;
  config.ENTRY_POINT = ENTRY_POINT;

  this.utils = {
    isDeployer: address => Proxy.isDeployer(address),
    isAuditor: (address, type) => Proxy.isAuditor(address, type)
  };

  this.getProxyAddress = () => EntryPoint.getProxyAddress();
  this.getRegistryAddress = key => Proxy.getRegistryAddress(key);

  // @dev "key" is token symbol or address
  this.token = {
    getList: () => Tokens.getTokensList(),
    getConfig: address => Config.getConfig(address),
    getTokenAddress: symbol => Tokens.getTokenAddress(symbol),
    getTokenSymbol: address => Tokens.getTokenSymbol(address),
    getAuditDBAddress: key => Token.getAuditDBAddress(key),
    getRPCAddress: key => Token.getRPCAddress(key),
    getTokenPrice: key => Token.getTokenPrice(key)
  };

  this.project = {
    getList: () => Projects.getProjectsList(),
    getConfig: address => Config.getConfigDirectly(address),
    deploy: (type, params, options) =>
      Deployer.deployProject(type, params, options)
  };

  this.platform = {
    getAssetsList: () => Assets.getAssetsList(),
    getAssetRate: key => Assets.getAssetRate(key)
  };
}

module.exports = SDK;
