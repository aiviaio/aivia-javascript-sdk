const TPLRegistry = require("../ABI/TPLRegistry");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const Proxy = require("./Proxy");
const utils = require("../utils");
const signedTX = require("../helpers/signedTX");

const addUser = async (
  walletAddress,
  countryID,
  walletType,
  expirationDate,
  options
) => {
  const registryAddress = await Proxy.getRegistryAddress("tpl");
  this.instance = createInstance(TPLRegistry.abi, registryAddress, this);
  const action = this.instance.methods.addUser(
    walletAddress,
    countryID,
    walletType,
    expirationDate
  );
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
  const Events = await this.instance.getPastEvents("registryEvent", {
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

module.exports = {
  addUser
};
