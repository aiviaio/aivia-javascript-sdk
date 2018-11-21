const is = require("is_js");
const web3 = require("./core");

module.exports = {
  is,
  toHex: string => web3.utils.utf8ToHex(string),
  toWei: value => web3.utils.toWei(value.toString(), "ether"),
  fromWei: value => Number(web3.utils.fromWei(value.toString(), "ether")),
  isAddress: address => web3.utils.isAddress(address),
  toUtf8: hex => web3.utils.toUtf8(hex)
};
