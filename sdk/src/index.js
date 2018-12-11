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
    approve: (address, spender, value, { from, privateKey, gasPrice }) =>
      ERC20.approve(address, spender, value, { from, privateKey, gasPrice }),
    allowance: (address, owner, spender) => ERC20.allowance(address, owner, spender),
    transfer: (wallet, value, contractAddress, { from, privateKey, gasPrice }) =>
      ERC20.transfer(wallet, value, contractAddress, { from, privateKey, gasPrice }),
    transferETH: (to, value, { from, privateKey, gasPrice }) =>
      ERC20.transferETH(to, value, { from, privateKey, gasPrice })
  },

  trade: {
    // @dev callback return tx hash
    buy: (value, assetAddress, currencyAddress, { from, privateKey, gasPrice }, callback) =>
      RPC.buyAsset(value, assetAddress, currencyAddress, { from, privateKey, gasPrice }, callback),
    sell: (value, assetAddress, { from, privateKey, gasPrice }, callback) =>
      RPC.sellAsset(value, assetAddress, { from, privateKey, gasPrice }, callback),
    estimate: (value, assetAddress, currencyAddress) =>
      estimateTX(value, assetAddress, currencyAddress)
  },

  project: {
    getList: () => ProjectsRegistry.getProjectsList(),
    getConfig: address => Config.getConfigDirectly(address),
    deploy: (type, params, { from, privateKey, gasPrice }) =>
      Deployer.deployProject(type, params, { from, privateKey, gasPrice })
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
    addUser: (
      walletAddress,
      countryID,
      walletType,
      expirationDate,
      { from, privateKey, gasPrice }
    ) =>
      TPLRegistry.addUser(walletAddress, countryID, walletType, expirationDate, {
        from,
        privateKey,
        gasPrice
      }),
    getUsersList: (short = false) => TPLRegistry.getUsersList(short),
    getUserDetails: address => TPLRegistry.getUserDetails(address)
  },

  custodian: {
    getList: () => CustodiansRegistry.getList(),
    getDetails: address => CustodiansRegistry.getDetails(address)
  },

  dev: {
    mint: (value, walletAddress, assetAddress, { from, privateKey, gasPrice }) =>
      ERC20.mint(value, walletAddress, assetAddress, { from, privateKey, gasPrice }),
    updatePermission: (address, countryID, walletTypes, { from, privateKey, gasPrice }, callback) =>
      Config.updatePermission(
        address,
        countryID,
        walletTypes,
        { from, privateKey, gasPrice },
        callback
      )
  }
};

module.exports = SDK;
