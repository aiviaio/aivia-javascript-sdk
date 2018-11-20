const web3 = require("../core");

module.exports = (ABI, address, component, name = "instance") => {
  if (!component[name]) {
    return new web3.eth.Contract(ABI, address);
  }
  return component[name];
};
