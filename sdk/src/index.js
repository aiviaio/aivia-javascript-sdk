const config = require("./config");
const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");
const Deployer = require("./contracts/Deployer");

const AssetsRegistry = require("./contracts/AssetsRegistry");
const ProjectsRegistry = require("./contracts/ProjectsRegistry");
const SCRegistry = require("./contracts/SCRegistry");
const PlatformRegistry = require("./contracts/PlatformRegistry");
const TPLRegistry = require("./contracts/TPLRegistry");

const Asset = require("./contracts/Asset");
const Config = require("./contracts/Config");

const RPC = require("./contracts/RPC");
const ERC20 = require("./contracts/ERC20");

function SDK(ENTRY_POINT, HTTP_PROVIDER) {
  config.init(ENTRY_POINT, HTTP_PROVIDER);
}

SDK.prototype = {
  utils: {
    isDeployer: address => Proxy.isDeployer(address),
    isAuditor: (address, type) => Proxy.isAuditor(address, type)
  },

  getProxyAddress: () => EntryPoint.getProxyAddress(),
  getRegistryAddress: key => Proxy.getRegistryAddress(key),

  // @dev "key" is token symbol or address
  asset: {
    getList: () => AssetsRegistry.getAssetsList(),
    getConfig: address => Config.getConfig(address),
    getAssetAddress: symbol => AssetsRegistry.getAssetAddress(symbol),
    getAssetSymbol: address => AssetsRegistry.getAssetSymbol(address),
    getAuditDBAddress: key => Asset.getAuditDBAddress(key),
    getRPCAddress: key => Asset.getRPCAddress(key),
    getAssetPrice: key => Asset.getAssetPrice(key),
    getBalance: (address, wallet) => ERC20.getBalance(address, wallet)
  },

  trade: {
    buy: (value, buyAddress, sellAddress, options) =>
      RPC.buyAsset(value, buyAddress, sellAddress, options),
    sell: (value, assetAddress, options) =>
      RPC.sellAsset(value, assetAddress, options)
  },

  project: {
    getList: () => ProjectsRegistry.getProjectsList(),
    getConfig: address => Config.getConfigDirectly(address),
    deploy: (type, params, options) =>
      Deployer.deployProject(type, params, options)
  },

  platform: {
    currency: {
      getList: () => SCRegistry.getList(),
      getRate: key => SCRegistry.getRate(key),
      getAddress: symbol => SCRegistry.getAddress(symbol),
      getSymbol: address => SCRegistry.getSymbol(address)
    },
    wallet: () => PlatformRegistry.getPlatformWallet(),
    token: () => PlatformRegistry.getPlatformToken()
  },

  auditors: {
    addUser: (walletAddress, countryID, walletType, expirationDate, options) =>
      TPLRegistry.addUser(
        walletAddress,
        countryID,
        walletType,
        expirationDate,
        options
      )
  },

  dev: {
    mint: (value, walletAddress, assetAddress, options) =>
      ERC20.mint(value, walletAddress, assetAddress, options)
  }
};

module.exports = SDK;
