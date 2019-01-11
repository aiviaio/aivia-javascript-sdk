const web3 = require("web3");

// demo users forum rifle frozen rifle lift pony endorse festival grunt curve evoke iron
const users = {
  platform: {
    address: "0x6814d2d6f4b568753ff41628df83f800a0b9a483",
    key: "5d6645700ce913e0d40a1a4cc82edd693bc22539bf3bec4cfe6263763fa73a94"
  },
  platformWallet: {
    address: "0xe5013cc3a5e12738fe149a3e3ddff560ca13db67",
    key: "e99b8405af796e858fc0f51d22aa5ce3d678a7e652b028e0836c684d475137f5"
  },
  DGAddress: {
    address: "0xf82a4e23696f999c9836a598d8f341bed0cc9c32",
    key: "8129dd9c4013b5b6070cdbeae3f9eb9ffdc2bfb06d69ce22f8cee15b5ff111b6"
  },
  projectOwner: {
    address: "0xd4093c89cf857862dfde99be046931e1e20af7aa",
    key: "6a552a54757c78facd4c5d9d8f72803e79fe50a9f8e89195e2100eb94a0bd7e6"
  },
  custodian: {
    address: "0x528207566f229f81d85edba61a1f13273a7ece4a",
    key: "ab63e7f18b072fb5c0e6e93f73e496464de49eb76e80ce1718593e2d93c08045"
  },
  user: {
    address: "0x1b0a41de654d52b8aa5c7b4258002cae483a8a68",
    key: "4948e1d0b910f1abcf5bf362709d536c466f3aec324d1685a7d6ecdf889c1c3a"
  },
  otherUser: {
    address: "0x96a95964870c93e6bd015fa96855081fa093c6aa",
    key: "90fc8828c7b28e40275ef308d834f706eceb022666a91926b4a94ef8925286ef"
  },

  trueUSDOwner: {
    address: "0xa051ba8f9ff0032638039c3a6965e507448c6c29",
    key: "971d073b9f16ea9ddca457bd0128a98457f076736a97dcf261b8e6ad3fd97dfd"
  },
  external: {
    address: "0xafe22a6fcab83587ec70c8ccaeaea7c38a3e16ac",
    key: "a054ac0cae527435c08f8b5b083d1a4e15e1ab7335e7aa46714150913889ce60"
  },
  auditorAssets: {
    address: "0xf3cd25e603f6159eb939aea6a2a249b3da8f8045",
    key: "9063c68219edc292cf1c5b5e22ef6b7ba9ddd502a2c1db95a9f07a2b7afd66b5"
  },
  auditorTPL: {
    address: "0xc83a66364e1e2e3db452c70fe74632d919613858",
    key: "870cb512b178344ffe5b4a55d6ad3115d0678b656939da63165bab7ed151255d"
  },
  auditorProject: {
    address: "0x028039ee1aa83174e9469892d6a9ac31bd95852e",
    key: "90769b91ac0ccde7e38af0dec25c4911344e7adc51cea38edb946fe728fcc4bd"
  },
  auditorTest: {
    address: "0xd919cd16f791b15722e20e63ce0a7321e52e978f",
    key: "dd918e73353784d13bf1b071bdf34a16bce8262bcb226d76a1d733765df506da"
  }
};

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
