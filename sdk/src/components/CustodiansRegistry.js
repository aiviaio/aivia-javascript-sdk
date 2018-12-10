const CustodiansRegistry = require("../ABI/CustodiansRegistry");
const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");

const getList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("custodians");
  const instance = createInstance(CustodiansRegistry.abi, registryAddress);
  const addressesList = await errorHandler(instance.methods.getCustodiansList().call());
  const custodiansList = addressesList.map(async address => {
    const details = await instance.methods.getCustodianDetails(address).call();
    const [name, contracts] = Object.values(details);
    return { address, name: utils.toUtf8(name), contracts };
  });

  return Promise.all(custodiansList);
};

const getDetails = async address => {
  const registryAddress = await Proxy.getRegistryAddress("custodians");
  const instance = createInstance(CustodiansRegistry.abi, registryAddress);
  const details = await instance.methods.getCustodianDetails(address).call();
  const [name, contracts] = Object.values(details);
  return { name: utils.toUtf8(name), contracts };
};

module.exports = {
  getList,
  getDetails
};
