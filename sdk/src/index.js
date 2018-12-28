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
const getNonce = require("./helpers/getNonce");
const { getProvider } = require("./helpers/createInstance");
const Ratings = require("./components/Ratings");

const RPC = require("./components/RPC");
const ERC20 = require("./components/ERC20");

function SDK(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE = 50000000000) {
  config.init(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE);
}

SDK.prototype = {
  utils: {
    isDeployer: deployerAddress => Proxy.isDeployer(deployerAddress),
    isAuditor: (auditorAddress, type) => Proxy.isAuditor(auditorAddress, type),
    getNonce: address => getNonce(address),
    provider: () => getProvider()
  },

  getProxyAddress: () => EntryPoint.getProxyAddress(),
  getRegistryAddress: key => Proxy.getRegistryAddress(key),

  asset: {
    getConfig: assetAddress => Config.getConfig(assetAddress),
    getRatingsList: () => Ratings.getRatingsList(),

    // AssetsRegistry
    getList: () => AssetsRegistry.getList(),
    getAssetAddress: symbol => AssetsRegistry.getAssetAddress(symbol),
    getAssetSymbol: assetAddress => AssetsRegistry.getAssetSymbol(assetAddress),

    // Asset
    getAuditDBAddress: addressOrSymbol => Asset.getAuditDBAddress(addressOrSymbol),
    getRPCAddress: addressOrSymbol => Asset.getRPCAddress(addressOrSymbol),
    getRate: addressOrSymbol => Asset.getRate(addressOrSymbol),
    getInvestors: assetAddress => Asset.getInvestors(assetAddress),

    // audit DB
    updateRate: (assetAddress, AUM, checksum, options) =>
      Asset.updateRate(assetAddress, AUM, checksum, options),

    // NET
    NET: addressOrSymbol => Asset.NET(addressOrSymbol),

    // ERC20
    getBalance: (wallet, assetAddress, isString) =>
      ERC20.getBalance(wallet, assetAddress, isString),
    totalSupply: assetAddress => ERC20.totalSupply(assetAddress),
    approve: (assetAddress, spender, value, options, callback) =>
      ERC20.approve(assetAddress, spender, value, options, callback),
    allowance: (assetAddress, owner, spender) => ERC20.allowance(assetAddress, owner, spender),
    transfer: (to, value, assetAddress, options, callback, estimate) =>
      ERC20.transfer(to, value, assetAddress, options, callback, estimate),
    transferETH: (to, value, options, callback, estimate) =>
      ERC20.transferETH(to, value, options, callback, estimate),
    mint: (value, to, assetAddress, options, callback) =>
      ERC20.mint(value, to, assetAddress, options, callback)
  },

  trade: {
    checkBeforeBuy: (value, assetAddress, currencyAddress, from) =>
      RPC.checkBeforeBuy(value, assetAddress, currencyAddress, from),
    buy: (value, assetAddress, currencyAddress, options, callback, estimate) =>
      RPC.buyAsset(value, assetAddress, currencyAddress, options, callback, estimate),
    checkBeforeSell: (value, assetAddress, from) => RPC.checkBeforeSell(value, assetAddress, from),
    sell: (value, assetAddress, options, callback, estimate) =>
      RPC.sellAsset(value, assetAddress, options, callback, estimate),

    estimate: (value, assetAddress, currencyAddress) =>
      RPC.estimate(value, assetAddress, currencyAddress)
  },

  project: {
    getList: () => ProjectsRegistry.getProjectsList(),
    getConfig: configAddress => Config.getConfigDirectly(configAddress),
    deploy: (type, params, options, callback) => Deployer.deploy(type, params, options, callback),
    updatePermission: (configAddress, countryID, walletTypes, options, callback) =>
      Config.updatePermission(configAddress, countryID, walletTypes, options, callback)
  },

  platform: {
    currency: {
      getList: () => SCRegistry.getList(),
      getRate: addressOrSymbol => SCRegistry.getRate(addressOrSymbol),
      getAddress: symbol => SCRegistry.getAddress(symbol),
      getSymbol: currencyAddress => SCRegistry.getSymbol(currencyAddress)
    },
    wallet: () => PlatformRegistry.getPlatformWallet(),
    token: () => PlatformRegistry.getPlatformToken()
  },

  auditor: {
    addUser: (userAddress, countryID, walletType, expirationDate, options, callback) =>
      TPLRegistry.addUser(userAddress, countryID, walletType, expirationDate, options, callback),
    getUsersList: (short = false) => TPLRegistry.getUsersList(short),
    getUserDetails: userAddress => TPLRegistry.getUserDetails(userAddress)
  },

  custodian: {
    getList: () => CustodiansRegistry.getList(),
    getDetails: custodianAddress => CustodiansRegistry.getDetails(custodianAddress)
  }
};

module.exports = SDK;
