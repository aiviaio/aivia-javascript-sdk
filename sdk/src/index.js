const config = require("./config");
const EntryPoint = require("./components/EntryPoint");
const Proxy = require("./components/Proxy");
const Deployer = require("./components/Deployer");
const AssetsRegistry = require("./components/AssetsRegistry");
const CustodiansRegistry = require("./components/CustodiansRegistry");
const ProjectsRegistry = require("./components/ProjectsRegistry");
const SCRegistry = require("./components/SCRegistry");
const PlatformRegistry = require("./components/PlatformRegistry");
const TPLRegistry = require("./components/TPLRegistry");
const Asset = require("./components/Asset");
const Config = require("./components/Config");
const { estimateTX } = require("./helpers/estimateTX");
const { getProvider } = require("./helpers/createInstance");
const Ratings = require("./components/Ratings");

const RPC = require("./components/RPC");
const ERC20 = require("./components/ERC20");

function SDK(ENTRY_POINT, HTTP_PROVIDER) {
  config.init(ENTRY_POINT, HTTP_PROVIDER);
}

SDK.prototype = {
  utils: {
    isDeployer: address => Proxy.isDeployer(address),
    isAuditor: (address, type) => Proxy.isAuditor(address, type),
    provider: () => getProvider()
  },

  getProxyAddress: () => EntryPoint.getProxyAddress(),
  getRegistryAddress: key => Proxy.getRegistryAddress(key),

  // @dev "key" is token symbol or address
  // @dev options = { from: walletAddress, privateKey: privateKey, gasPrice: gasPrice }
  asset: {
    getConfig: address => Config.getConfig(address),
    getRatingsList: () => Ratings.getRatingsList(),

    // AssetsRegistry
    getList: () => AssetsRegistry.getAssetsList(),
    getAssetAddress: symbol => AssetsRegistry.getAssetAddress(symbol),
    getAssetSymbol: address => AssetsRegistry.getAssetSymbol(address),

    // Asset
    getAuditDBAddress: key => Asset.getAuditDBAddress(key),
    getRPCAddress: key => Asset.getRPCAddress(key),
    getRate: key => Asset.getRate(key),
    getInvestors: address => Asset.getInvestorsCount(address),

    // audit DB
    updateRate: (address, AUM, checksum, options) =>
      Asset.updateRate(address, AUM, checksum, options),

    // NET
    NET: key => Asset.NET(key),

    // ERC20
    getBalance: (wallet, address) => ERC20.getBalance(wallet, address),
    totalSupply: address => ERC20.totalSupply(address),
    approve: (address, spender, value, options) => ERC20.approve(address, spender, value, options),
    allowance: (address, owner, spender) => ERC20.allowance(address, owner, spender),
    transfer: (address, wallet, value, options) => ERC20.transfer(address, wallet, value, options)
  },

  trade: {
    // @dev callback return tx hash
    buy: (value, assetAddress, currencyAddress, options, callback) =>
      RPC.buyAsset(value, assetAddress, currencyAddress, options, callback),
    sell: (value, assetAddress, options, callback) =>
      RPC.sellAsset(value, assetAddress, options, callback),
    estimate: (value, assetAddress, currencyAddress) =>
      estimateTX(value, assetAddress, currencyAddress)
  },

  project: {
    getList: () => ProjectsRegistry.getProjectsList(),
    getConfig: address => Config.getConfigDirectly(address),
    deploy: (type, params, options) => Deployer.deployProject(type, params, options)
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

  auditor: {
    addUser: (walletAddress, countryID, walletType, expirationDate, options) =>
      TPLRegistry.addUser(walletAddress, countryID, walletType, expirationDate, options),
    getUsersList: (short = false) => TPLRegistry.getUsersList(short),
    getUserDetails: address => TPLRegistry.getUserDetails(address)
  },

  custodian: {
    getList: () => CustodiansRegistry.getList(),
    getDetails: address => CustodiansRegistry.getDetails(address)
  },

  dev: {
    mint: (value, walletAddress, assetAddress, options) =>
      ERC20.mint(value, walletAddress, assetAddress, options),
    updatePermission: (address, countryID, walletTypes, options, callback) =>
      Config.updatePermission(address, countryID, walletTypes, options, callback)
  }
};

module.exports = SDK;
