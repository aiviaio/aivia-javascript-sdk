const Web3 = require("web3");
const config = require("../config");

let provider = null;

const createInstance = (ABI, address, component, name = "instance") => {
  if (!provider) {
    provider = new Web3(
      new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER"))
    );
  }
  if (!component[name] || component[name]._address !== address) {
    return new provider.eth.Contract(ABI, address);
  }
  return component[name];
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
