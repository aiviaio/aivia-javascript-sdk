const web3 = require("./core");

module.exports = {
  toHex: string => web3.utils.utf8ToHex(string)
};
