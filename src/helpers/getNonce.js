const { getProvider } = require("../helpers/createInstance");
const { isAddress } = require("../helpers/errorHandler");

module.exports = async address => {
  isAddress({ address });
  const web3 = getProvider();
  const nonce = await web3.eth.getTransactionCount(address);
  return nonce;
};
