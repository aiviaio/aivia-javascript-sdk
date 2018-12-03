const Web3 = require("web3");
const config = require("../config");

let provider = null;

const list = {};

const createInstance = (ABI, address) => {
  if (!provider) {
    provider = new Web3(
      new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER"))
    );
  }
  const key = JSON.stringify(ABI) + address;

  if (list[key]) {
    return list[key];
  }

  const instance = new provider.eth.Contract(ABI, address);
  list[key] = instance;
  return instance;
};

const getProvider = () => {
  if (!provider) {
    provider = new Web3(
      new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER"))
    );
    return provider;
  }
  return provider;
};

module.exports = {
  createInstance,
  getProvider
};
