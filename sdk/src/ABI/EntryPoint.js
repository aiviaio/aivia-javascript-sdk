module.exports = {
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "isMaster",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x6f791d29"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isDGAddress",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xe25a37b4"
    },
    {
      "inputs": [
        {
          "name": "_DGStorageAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setInitialProxyAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x2bde75ef"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setProxyAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x46a7dadc"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getProxyAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x43a73d9a"
    }
  ],
  "address": "0xF34d7238fd5671B12f1BA0A09002E2Dab052a920"
}