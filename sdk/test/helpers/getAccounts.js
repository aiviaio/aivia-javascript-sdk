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
    user: accounts[4],
    otherUser: accounts[5],
    platformWallet: accounts[6],
    trueUSDOwner: accounts[7],
    external: accounts[8],
    auditorAssets: accounts[9],
    auditorTPL: accounts[10],
    auditorProject: accounts[11],
    auditorTest: accounts[12]
  };
  return users[role];
};
