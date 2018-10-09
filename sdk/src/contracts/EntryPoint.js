const EntryPointABI = require("../ABI/EntryPoint");
const web3 = require("../core");
const config = require("../config");

const entryPoint = new web3.eth.Contract(
  EntryPointABI,
  config.addresses.entryPoint
);

const getProxyAddress = async () => {
  const address = await entryPoint.methods.getProxyAddress().call();
  return address;
};

const setProxyAddress = (address, options) =>
  entryPoint.methods.setProxyAddress(address).send({ from: options.from });

module.exports = {
  getProxyAddress,
  setProxyAddress
};
