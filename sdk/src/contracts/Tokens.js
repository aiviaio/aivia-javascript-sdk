const Tokens = require("../ABI/TokensRegistry");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");

const getTokensList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("tokens");

  this.instance = createInstance(Tokens.abi, registryAddress, this);
  const addressesList = await errorHandler(
    this.instance.methods.getTokensList().call()
  );

  const tokensList = addressesList.map(async address => {
    const hex = await this.instance.methods.getSymbol(address).call();
    const symbol = utils.hexToString(hex);
    return { symbol, address };
  });

  return Promise.all(tokensList);
};

module.exports = {
  getTokensList
};
