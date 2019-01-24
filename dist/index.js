"use strict";

var config = require("./config");

var EntryPoint = require("./components/EntryPoint");

var Proxy = require("./components/Proxy");

var Deployer = require("./components/Deployer");

var AssetsRegistry = require("./components/AssetsRegistry");

var CustodiansRegistry = require("./components/CustodiansRegistry");

var ProjectsRegistry = require("./components/ProjectsRegistry");

var SCRegistry = require("./components/SCRegistry");

var PlatformRegistry = require("./components/PlatformRegistry");

var TPLRegistry = require("./components/TPLRegistry");

var Asset = require("./components/Asset");

var Config = require("./components/Config");

var _getNonce = require("./helpers/getNonce");

var _require = require("./helpers/createInstance"),
    getProvider = _require.getProvider;

var Ratings = require("./components/Ratings");

var RPC = require("./components/RPC");

var ERC20 = require("./components/ERC20");

function SDK(ENTRY_POINT, HTTP_PROVIDER) {
  var DEFAULT_GAS_PRICE = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50000000000;
  config.init(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE);
}

SDK.prototype = {
  utils: {
    isDeployer: function isDeployer(deployerAddress) {
      return Proxy.isDeployer(deployerAddress);
    },
    isAuditor: function isAuditor(auditorAddress, type) {
      return Proxy.isAuditor(auditorAddress, type);
    },
    getNonce: function getNonce(address) {
      return _getNonce(address);
    },
    provider: function provider() {
      return getProvider();
    }
  },
  getProxyAddress: function getProxyAddress() {
    return EntryPoint.getProxyAddress();
  },
  getRegistryAddress: function getRegistryAddress(key) {
    return Proxy.getRegistryAddress(key);
  },
  asset: {
    getConfig: function getConfig(assetAddress) {
      return Config.getConfig(assetAddress);
    },
    getRatingsList: function getRatingsList() {
      return Ratings.getRatingsList();
    },
    // AssetsRegistry
    getList: function getList() {
      return AssetsRegistry.getList();
    },
    getAssetAddress: function getAssetAddress(symbol) {
      return AssetsRegistry.getAssetAddress(symbol);
    },
    getAssetSymbol: function getAssetSymbol(assetAddress) {
      return AssetsRegistry.getAssetSymbol(assetAddress);
    },
    // Asset
    getAuditDBAddress: function getAuditDBAddress(addressOrSymbol) {
      return Asset.getAuditDBAddress(addressOrSymbol);
    },
    getRPCAddress: function getRPCAddress(addressOrSymbol) {
      return Asset.getRPCAddress(addressOrSymbol);
    },
    getRate: function getRate(addressOrSymbol) {
      return Asset.getRate(addressOrSymbol);
    },
    getInvestors: function getInvestors(assetAddress) {
      return Asset.getInvestors(assetAddress);
    },
    // audit DB
    updateRate: function updateRate(assetAddress, AUM, checksum, options, callback, estimate) {
      return Asset.updateRate(assetAddress, AUM, checksum, options, callback, estimate);
    },
    // NET
    NET: function NET(addressOrSymbol) {
      return Asset.NET(addressOrSymbol);
    },
    // ERC20
    getBalance: function getBalance(wallet, assetAddress, isString) {
      return ERC20.getBalance(wallet, assetAddress, isString);
    },
    totalSupply: function totalSupply(assetAddress) {
      return ERC20.totalSupply(assetAddress);
    },
    approve: function approve(assetAddress, spender, value, options, callback, estimate) {
      return ERC20.approve(assetAddress, spender, value, options, callback, estimate);
    },
    allowance: function allowance(assetAddress, owner, spender) {
      return ERC20.allowance(assetAddress, owner, spender);
    },
    transfer: function transfer(to, value, assetAddress, options, callback, estimate) {
      return ERC20.transfer(to, value, assetAddress, options, callback, estimate);
    },
    transferETH: function transferETH(to, value, options, callback, estimate) {
      return ERC20.transferETH(to, value, options, callback, estimate);
    },
    mint: function mint(value, to, assetAddress, options, callback, estimate) {
      return ERC20.mint(value, to, assetAddress, options, callback, estimate);
    }
  },
  trade: {
    checkBeforeBuy: function checkBeforeBuy(value, assetAddress, currencyAddress, from) {
      return RPC.checkBeforeBuy(value, assetAddress, currencyAddress, from);
    },
    buy: function buy(value, assetAddress, currencyAddress, options, callback, estimate) {
      return RPC.buyAsset(value, assetAddress, currencyAddress, options, callback, estimate);
    },
    checkBeforeSell: function checkBeforeSell(value, assetAddress, from) {
      return RPC.checkBeforeSell(value, assetAddress, from);
    },
    sell: function sell(value, assetAddress, options, callback, estimate) {
      return RPC.sellAsset(value, assetAddress, options, callback, estimate);
    },
    estimate: function estimate(value, assetAddress, currencyAddress) {
      return RPC.estimate(value, assetAddress, currencyAddress);
    }
  },
  project: {
    getList: function getList() {
      return ProjectsRegistry.getProjectsList();
    },
    getConfig: function getConfig(configAddress) {
      return Config.getConfigDirectly(configAddress);
    },
    deploy: function deploy(type, params, options, callback, estimate) {
      return Deployer.deploy(type, params, options, callback, estimate);
    },
    update: function update(configAddress, key, value, options, callback, estimate) {
      return Config.update(configAddress, key, value, options, callback, estimate);
    },
    getConfigAddress: function getConfigAddress(assetAddress) {
      return Config.getConfigAddress(assetAddress);
    },
    // permissions
    updatePermissionRule: function updatePermissionRule(configAddress, rule, options, callback, estimate) {
      return Config.updatePermissionRule(configAddress, rule, options, callback, estimate);
    },
    updatePermission: function updatePermission(configAddress, countryID, walletTypes, options, callback, estimate) {
      return Config.updatePermission(configAddress, countryID, walletTypes, options, callback, estimate);
    },
    getPermissionsRule: function getPermissionsRule(configAddress) {
      return Config.getPermissionsRule(configAddress);
    },
    getPermissionsList: function getPermissionsList(configAddress, countryID) {
      return Config.getPermissionsList(configAddress, countryID);
    }
  },
  platform: {
    currency: {
      getList: function getList() {
        return SCRegistry.getList();
      },
      getRate: function getRate(addressOrSymbol) {
        return SCRegistry.getRate(addressOrSymbol);
      },
      getAddress: function getAddress(symbol) {
        return SCRegistry.getAddress(symbol);
      },
      getSymbol: function getSymbol(currencyAddress) {
        return SCRegistry.getSymbol(currencyAddress);
      }
    },
    wallet: function wallet() {
      return PlatformRegistry.getPlatformWallet();
    },
    token: function token() {
      return PlatformRegistry.getPlatformToken();
    }
  },
  auditor: {
    addUser: function addUser(userAddress, countryID, walletType, expirationDate, options, callback) {
      return TPLRegistry.addUser(userAddress, countryID, walletType, expirationDate, options, callback);
    },
    getUsersList: function getUsersList() {
      var short = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return TPLRegistry.getUsersList(short);
    },
    getUserDetails: function getUserDetails(userAddress) {
      return TPLRegistry.getUserDetails(userAddress);
    }
  },
  custodian: {
    getList: function getList() {
      return CustodiansRegistry.getList();
    },
    getDetails: function getDetails(custodianAddress) {
      return CustodiansRegistry.getDetails(custodianAddress);
    }
  }
};
module.exports = SDK;