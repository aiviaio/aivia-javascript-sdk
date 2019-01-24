const web3 = require("web3");

const users = require("../users");

module.exports = {
  getAddress(role) {
    return web3.utils.toChecksumAddress(users[role].address);
  },
  getKeys() {
    return Object.values(users).map(user => user.key);
  },
  getUser(role, gasPrice) {
    return {
      from: web3.utils.toChecksumAddress(users[role].address),
      privateKey: users[role].key,
      gasPrice
    };
  }
};
