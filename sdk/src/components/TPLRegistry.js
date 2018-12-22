const TPLRegistry = require("../ABI/TPLRegistry");
const { createInstance } = require("../helpers/createInstance");
const { errorHandler, isAddress, isInteger } = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");
const signedTX = require("../helpers/signedTX");

/**
 * @module TPL Registry
 * @typicalname SDK.auditors
 */

/**
 * add or update user
 * @param {address} userAddress user wallet address
 * @param {number} countryID county ID
 * @param {number} walletType wallet type ID
 * @param {number} [expirationDate=0] expiration date
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {function} callback function(hash)
 * @return {event} transaction event {eventName, address}
 */
exports.addUser = async (
  userAddress,
  countryID,
  walletType,
  expirationDate = 0,
  options,
  callback
) => {
  isAddress({ userAddress });
  isInteger({ countryID, walletType, expirationDate });
  const registryAddress = await Proxy.getRegistryAddress("tpl");
  const instance = createInstance(TPLRegistry.abi, registryAddress);
  const action = instance.methods.addUser(userAddress, countryID, walletType, expirationDate);
  const { blockNumber } = await errorHandler(
    signedTX({
      data: action.encodeABI(),
      from: options.from,
      to: registryAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );
  const Events = errorHandler(
    await instance.getPastEvents("registryEvent", {
      filter: { eventName: "Add" },
      fromBlock: blockNumber,
      toBlock: "latest"
    })
  );

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

/**
 * returns user details by address
 * @param {address} userAddress
 * @returns {object} userDetails
 * @property {address} userDetails.address
 * @property {number} userDetails.country
 * @property {number} userDetails.walletType
 * @property {number} userDetails.expirationDate
 */
exports.getUserDetails = async userAddress => {
  isAddress({ userAddress });
  const registryAddress = await Proxy.getRegistryAddress("tpl");
  const instance = createInstance(TPLRegistry.abi, registryAddress);
  const userDetails = await errorHandler(instance.methods.getUserDetails(userAddress).call());
  const [country, walletType, expirationDate] = Object.values(userDetails);
  return {
    address: userAddress,
    country: Number(country),
    walletType: Number(walletType),
    expirationDate: Number(expirationDate)
  };
};

/**
 * returns user list list
 * @returns {userList[]}
 * @property {object} userList.user
 * @property {address} user.address
 * @property {number} user.country
 * @property {number} user.walletType
 * @property {number} user.expirationDate
 */
exports.getUsersList = async short => {
  const registryAddress = await Proxy.getRegistryAddress("tpl");
  const instance = createInstance(TPLRegistry.abi, registryAddress);
  const addressList = await errorHandler(instance.methods.getUsersList().call());
  if (short) {
    return addressList;
  }
  const userList = addressList.map(async address => {
    const userDetails = await errorHandler(module.exports.getUserDetails(address));
    return userDetails;
  });
  return Promise.all(userList);
};
