const Web3 = require("web3");
const config = require("../config");

let provider = null;

const createInstance = (ABI, address) => {
  if (!provider) {
    provider = new Web3(
      new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER"))
    );
  }

  return new provider.eth.Contract(ABI, address);
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
