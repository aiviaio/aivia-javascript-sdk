const web3 = require("./core");

module.exports = {
  toHex: string => web3.utils.utf8ToHex(string),
  toWei: value => web3.utils.toWei(value.toString(), "ether"),
  fromWei: value => Number(web3.utils.fromWei(value.toString(), "ether")),
  isAddress: address => web3.utils.isAddress(address),
  hexToString: hex => web3.utils.hexToString(hex)
};
