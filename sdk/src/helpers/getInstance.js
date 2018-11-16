const web3 = require("../core");
const config = require("../config");

module.exports = ABI => {
  if (!this.instance) {
    this.instance = new web3.eth.Contract(ABI, config.ENTRY_POINT);
  }
  return this.instance;
};
