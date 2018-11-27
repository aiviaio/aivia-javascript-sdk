const Web3 = require("web3");
const config = require("../config");

module.exports = (ABI, address, component, name = "instance") => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER"))
  );
  if (!component[name] || component[name]._address !== address) {
    return new web3.eth.Contract(ABI, address);
  }
  return component[name];
};
