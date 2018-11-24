module.exports = {
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "proxy",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xec556889"
    },
    {
      "inputs": [
        {
          "name": "_entryPointAddress",
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
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_type",
          "type": "uint8"
        },
        {
          "name": "_bytesArray",
          "type": "bytes32[]"
        },
        {
          "name": "_uintArray",
          "type": "uint256[]"
        },
        {
          "name": "_addressArray",
          "type": "address[]"
        },
        {
          "name": "_countries",
          "type": "uint8[]"
        },
        {
          "name": "_walletTypes",
          "type": "uint8[]"
        },
        {
          "name": "permissionRule",
          "type": "bool"
        }
      ],
      "name": "deployProject",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xf113a68d"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "initProject",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x6d809e43"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "configAddress",
          "type": "address"
        }
      ],
      "name": "updateRPC",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x5f6da392"
    }
  ],
  "address": "0x0883F00095906d25F7FE149C3d033961f9B32C65"
}