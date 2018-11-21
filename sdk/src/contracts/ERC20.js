const ERC20 = require("../ABI/ERC20");

const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const utils = require("../utils");

const getBalance = async (address, wallet) => {
  this.instance = createInstance(ERC20.abi, address, this);
  const balance = await errorHandler(
    await this.instance.methods.balanceOf(wallet).call()
  );
  return utils.fromWei(balance);
};
module.exports = {
  getBalance
};
