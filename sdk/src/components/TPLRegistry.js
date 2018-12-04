const TPLRegistry = require("../ABI/TPLRegistry");
const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");
const signedTX = require("../helpers/signedTX");

const addUser = async (walletAddress, countryID, walletType, expirationDate, options) => {
  const registryAddress = await Proxy.getRegistryAddress("tpl");
  const instance = createInstance(TPLRegistry.abi, registryAddress);
  const action = instance.methods.addUser(walletAddress, countryID, walletType, expirationDate);
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: registryAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit
    })
  );
  const Events = await instance.getPastEvents("registryEvent", {
    filter: { eventName: "Add" },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  const [Event] = Events.map(event => {
    const { returnValues } = event;
    const [eventName, address] = Object.values(returnValues);
    return {
      eventName: utils.toUtf8(eventName),
      address
    };
  });
  return Event;
};

const getUserDetails = async address => {
  const registryAddress = await Proxy.getRegistryAddress("tpl");
  const instance = createInstance(TPLRegistry.abi, registryAddress);
  const userDetails = await errorHandler(instance.methods.getUserDetails(address).call());
  const [country, walletType, expirationDate] = Object.values(userDetails);
  return {
    address,
    country: Number(country),
    walletType: Number(walletType),
    expirationDate: Number(expirationDate)
  };
};

const getUsersList = async short => {
  const registryAddress = await Proxy.getRegistryAddress("tpl");
  const instance = createInstance(TPLRegistry.abi, registryAddress);
  const addressList = await errorHandler(instance.methods.getUsersList().call());
  if (short) {
    return addressList;
  }
  const userList = addressList.map(async address => {
    const userDetails = await getUserDetails(address);
    return userDetails;
  });
  return Promise.all(userList);
};

module.exports = {
  addUser,
  getUsersList,
  getUserDetails
};
