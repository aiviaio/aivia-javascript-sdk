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

function SDK(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE = 30000000000) {
  config.init(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE);
}

// @dev options = {from: "address", privateKey: "private key", gasPrice: "gas price"}

SDK.prototype = {
  utils: {
    isDeployer: address => Proxy.isDeployer(address),
    isAuditor: (address, type) => Proxy.isAuditor(address, type),
    provider: () => getProvider()
  },

  getProxyAddress: () => EntryPoint.getProxyAddress(),
  getRegistryAddress: addressOrSymbol => Proxy.getRegistryAddress(addressOrSymbol),

  asset: {
    getConfig: address => Config.getConfig(address),
    getRatingsList: () => Ratings.getRatingsList(),

    // AssetsRegistry
    getList: () => AssetsRegistry.getAssetsList(),
    getAssetAddress: symbol => AssetsRegistry.getAssetAddress(symbol),
    getAssetSymbol: address => AssetsRegistry.getAssetSymbol(address),

    // Asset
    getAuditDBAddress: addressOrSymbol => Asset.getAuditDBAddress(addressOrSymbol),
    getRPCAddress: addressOrSymbol => Asset.getRPCAddress(addressOrSymbol),
    getRate: addressOrSymbol => Asset.getRate(addressOrSymbol),
    getInvestors: address => Asset.getInvestorsCount(address),

    // audit DB
    updateRate: (address, AUM, checksum, options) =>
      Asset.updateRate(address, AUM, checksum, options),

    // NET
    NET: addressOrSymbol => Asset.NET(addressOrSymbol),

    // ERC20
    getBalance: (wallet, address) => ERC20.getBalance(wallet, address),
    totalSupply: address => ERC20.totalSupply(address),
    approve: (address, spender, value, options, callback) =>
      ERC20.approve(address, spender, value, options, callback),
    allowance: (address, owner, spender) => ERC20.allowance(address, owner, spender),
    transfer: (wallet, value, contractAddress, options, callback) =>
      ERC20.transfer(wallet, value, contractAddress, options, callback),
    transferETH: (to, value, options, callback) => ERC20.transferETH(to, value, options, callback)
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
    deploy: (type, params, options, callback) =>
      Deployer.deployProject(type, params, options, callback)
  },

  platform: {
    currency: {
      getList: () => SCRegistry.getList(),
      getRate: addressOrSymbol => SCRegistry.getRate(addressOrSymbol),
      getAddress: symbol => SCRegistry.getAddress(symbol),
      getSymbol: address => SCRegistry.getSymbol(address)
    },
    wallet: () => PlatformRegistry.getPlatformWallet(),
    token: () => PlatformRegistry.getPlatformToken()
  },

  auditor: {
    addUser: (walletAddress, countryID, walletType, expirationDate, options, callback) =>
      TPLRegistry.addUser(walletAddress, countryID, walletType, expirationDate, options, callback),
    getUsersList: (short = false) => TPLRegistry.getUsersList(short),
    getUserDetails: address => TPLRegistry.getUserDetails(address)
  },

  custodian: {
    getList: () => CustodiansRegistry.getList(),
    getDetails: address => CustodiansRegistry.getDetails(address)
  },

  dev: {
    mint: (value, walletAddress, assetAddress, options, callback) =>
      ERC20.mint(value, walletAddress, assetAddress, options, callback),
    updatePermission: (address, countryID, walletTypes, options, callback) =>
      Config.updatePermission(address, countryID, walletTypes, options, callback)
  }
};

module.exports = SDK;
