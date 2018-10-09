const EntryPoint = require("../ABI/EntryPoint");
const web3 = require("../core");

const entryPoint = new web3.eth.Contract(EntryPoint.abi, EntryPoint.address);

const getProxyAddress = async () => {
  const address = await entryPoint.methods.getProxyAddress().call();
  return address;
};

const setProxyAddress = async (address, options) => {
  entryPoint.methods.setProxyAddress(address).send({ from: options.from });
};

module.exports = {
  getProxyAddress,
  setProxyAddress
};
