"use strict";

var Web3 = require("web3");

var config = require("../config");

var provider = null;
var list = {};

var createInstance = function createInstance(ABI, contractAddress) {
  if (!provider) {
    provider = new Web3(new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER")));
  }

  var key = JSON.stringify(ABI) + contractAddress;

  if (list[key]) {
    return list[key];
  }

  var instance = new provider.eth.Contract(ABI, contractAddress);
  list[key] = instance;
  return instance;
};

var getProvider = function getProvider() {
  if (!provider) {
    provider = new Web3(new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER")));
    return provider;
  }

  return provider;
};

module.exports = {
  createInstance: createInstance,
  getProvider: getProvider
};