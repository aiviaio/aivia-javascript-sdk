const config = require("./config");
const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");
const Deployer = require("./contracts/Deployer");

const AssetsRegistry = require("./contracts/AssetsRegistry");
const ProjectsRegistry = require("./contracts/ProjectsRegistry");
const SCRegistry = require("./contracts/SCRegistry");
const PlatformRegistry = require("./contracts/PlatformRegistry");

const Asset = require("./contracts/Asset");
const Config = require("./contracts/Config");

const RPC = require("./contracts/RPC");
const ERC20 = require("./contracts/ERC20");

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
  this.asset = {
    getList: () => AssetsRegistry.getAssetsList(),
    getConfig: address => Config.getConfig(address),
    getAssetAddress: symbol => AssetsRegistry.getAssetAddress(symbol),
    getAssetSymbol: address => AssetsRegistry.getAssetSymbol(address),
    getAuditDBAddress: key => Asset.getAuditDBAddress(key),
    getRPCAddress: key => Asset.getRPCAddress(key),
    getAssetPrice: key => Asset.getAssetPrice(key),
    buy: (value, assetAddress, cryptoCurrencyAddress, options) =>
      RPC.buyAsset(value, assetAddress, cryptoCurrencyAddress, options),
    getBalance: (address, wallet) => ERC20.getBalance(address, wallet)
  };

  this.project = {
    getList: () => ProjectsRegistry.getProjectsList(),
    getConfig: address => Config.getConfigDirectly(address),
    deploy: (type, params, options) =>
      Deployer.deployProject(type, params, options)
  };

  this.platform = {
    currency: {
      getList: () => SCRegistry.getAssetsList(),
      getRate: key => SCRegistry.getAssetRate(key)
    },
    wallet: () => PlatformRegistry.getPlatformWallet(),
    token: () => PlatformRegistry.getPlatformToken()
  };
}

module.exports = SDK;
