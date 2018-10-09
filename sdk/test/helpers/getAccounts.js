const Web3 = require("web3");
const config = require("../../src/config");

const web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider));

module.exports = async role => {
  const accounts = await web3.eth.getAccounts();
  const users = {
    platform: accounts[0],
    DGAddress: accounts[1],
    projectOwner: accounts[2],
    custodian: accounts[3],
    auditor: accounts[4],
    user: accounts[5],
    otherUser: accounts[6],
    platformWallet: accounts[7],
    trueUSDOwner: accounts[8],
    external: accounts[9]
  };
  return users[role];
};
