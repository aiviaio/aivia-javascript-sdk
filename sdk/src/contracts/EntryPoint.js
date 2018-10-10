const EntryPoint = require("../ABI/EntryPoint");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");

const entryPoint = new web3.eth.Contract(EntryPoint.abi, EntryPoint.address);

const getProxyAddress = () =>
  errorHandler(entryPoint.methods.getProxyAddress().call());

const setProxyAddress = (address, options) =>
  errorHandler(
    entryPoint.methods.setProxyAddress(address).send({ from: options.from })
  );

module.exports = {
  getProxyAddress,
  setProxyAddress
};
