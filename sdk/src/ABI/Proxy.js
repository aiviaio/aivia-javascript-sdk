module.exports = {
  "abi": [
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
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
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
      "signature": "0xf720f80b"
    },
    {
      "inputs": [
        {
          "name": "_DGStorageAddress",
          "type": "address"
        },
        {
          "name": "_ProxyRegistryAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "components",
          "type": "address[]"
        }
      ],
      "name": "NewProject",
      "type": "event",
      "signature": "0x7300adb4a03b0d31fe2b5ea1f39f0c6deb06807f485a0f3386394627851a23c8"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_key",
          "type": "bytes32"
        }
      ],
      "name": "getRegistryAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8a7762e7"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_type",
          "type": "uint8"
        }
      ],
      "name": "isAuditor",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x500e68ad"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isDeployer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x50c358a4"
    },
    {
      "constant": false,
      "inputs": [
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
      "signature": "0xf74c65d0"
    },
    {
      "constant": false,
      "inputs": [],
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
      "signature": "0xedc1c4b3"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_config",
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
      "signature": "0xbe0ee616"
    }
  ],
  "address": "0x3427a0ee4AfcaB4B8E2EBEC5CF9261cf07b11F78"
}