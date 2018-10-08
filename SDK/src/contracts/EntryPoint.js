const web3 = require("../web3");
const EntryPointABI = require("../abi/EntryPoint");
const config = require("../config");

const entryPoint = new web3.eth.Contract(
  EntryPointABI,
  config.addresses.entryPoint
);

const getProxyAddress = async () => {
  const res = await entryPoint.methods.getProxyAddress().call();
  return res;
};

module.exports = {
  getProxyAddress
};
