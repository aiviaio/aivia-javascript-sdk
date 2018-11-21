const config = require("./config");
const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");
const Deployer = require("./contracts/Deployer");
const Tokens = require("./contracts/Tokens");
const Token = require("./contracts/Token");
const Config = require("./contracts/Config");
const Projects = require("./contracts/Projects");
const SCRegistry = require("./contracts/SCRegistry");
const RPC = require("./contracts/RPC");

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
    getTokenPrice: key => Token.getTokenPrice(key),
    buy: (value, buyAddress, sellAddress, options) =>
      RPC.buyToken(value, buyAddress, sellAddress, options)
  };

  this.project = {
    getList: () => Projects.getProjectsList(),
    getConfig: address => Config.getConfigDirectly(address),
    deploy: (type, params, options) =>
      Deployer.deployProject(type, params, options)
  };

  this.platform = {
    currency: {
      getList: () => SCRegistry.getList(),
      getRate: key => SCRegistry.getRate(key)
    }
  };
}

module.exports = SDK;
