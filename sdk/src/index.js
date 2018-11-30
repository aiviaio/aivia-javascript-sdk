const config = require("./config");
const EntryPoint = require("./components/EntryPoint");
const Proxy = require("./components/Proxy");
const Deployer = require("./components/Deployer");

const AssetsRegistry = require("./components/AssetsRegistry");
const ProjectsRegistry = require("./components/ProjectsRegistry");
const SCRegistry = require("./components/SCRegistry");
const PlatformRegistry = require("./components/PlatformRegistry");
const TPLRegistry = require("./components/TPLRegistry");

const Asset = require("./components/Asset");
const Config = require("./components/Config");

const Ratings = require("./components/Ratings");

const RPC = require("./components/RPC");
const ERC20 = require("./components/ERC20");

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
    getRate: key => Asset.getRate(key),
    getBalance: (wallet, address) => ERC20.getBalance(wallet, address),
    getRatingsList: () => Ratings.getRatingsList(),
    totalSupply: address => ERC20.totalSupply(address),
    getInvestors: address => Asset.getInvestorsCount(address),
    approve: (address, spender, value, options) =>
      ERC20.approve(address, spender, value, options),
    allowance: (address, owner, spender) =>
      ERC20.allowance(address, owner, spender),
    deltaNET: key => Asset.deltaNET(key),
    NET: key => Asset.NET(key)
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
