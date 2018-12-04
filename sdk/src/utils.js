const is = require("is_js");
const web3 = require("web3");

module.exports = {
  is,
  toHex: string => web3.utils.utf8ToHex(string),
  toWei: value => web3.utils.toWei(value.toString(), "ether"),
  fromWei: value => Number(web3.utils.fromWei(value.toString(), "ether")),
  isAddress: address => web3.utils.isAddress(address),
  toUtf8: hex => web3.utils.toUtf8(hex),
  toFixed: (value, count = 6) => Number(value.toFixed(count)),
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000"
};
