module.exports = function(accounts, role) {
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
