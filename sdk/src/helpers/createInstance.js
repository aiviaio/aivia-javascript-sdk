const Web3 = require("web3");
const config = require("../config");

let web3Instance = null;

const createInstance = (ABI, address, component, name = "instance") => {
  if (!web3Instance) {
    web3Instance = new Web3(
      new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER"))
    );
  }
  if (!component[name] || component[name]._address !== address) {
    return new web3Instance.eth.Contract(ABI, address);
  }
  return component[name];
};

const web3 = () => {
  if (!web3Instance) {
    web3Instance = new Web3(
      new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER"))
    );
    return web3Instance;
  }
  return web3Instance;
};

module.exports = {
  createInstance,
  web3
};
