module.exports = {
  "ABI": [
    {
      "constant": true,
      "inputs": [],
      "name": "EntryPoint",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x14cf557d"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "assetsList",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x71e85c41"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isProxyAddress",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xb88646e7"
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
      "constant": true,
      "inputs": [],
      "name": "AuditorsRegistry",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xf8c5146b"
    },
    {
      "inputs": [
        {
          "name": "_DGStorageAddress",
          "type": "address"
        },
        {
          "name": "_EntryPointAddress",
          "type": "address"
        },
        {
          "name": "_auditorRegisryAddress",
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
          "indexed": false,
          "name": "eventName",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "name": "symbol",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "registryEvent",
      "type": "event",
      "signature": "0x970601f4a0b569dc12be1307b881337073c217ec487a5185acb0a931208d0ca9"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "eventName",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "_rate",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "_address",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_auditor",
          "type": "address"
        }
      ],
      "name": "updateRate",
      "type": "event",
      "signature": "0x6ff63b6dcb0b9dc93c8cc89493ea59d97ec8407c927f189680378045df14e6a0"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getAssetByAddress",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x0cba53ea"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_symbol",
          "type": "bytes32"
        }
      ],
      "name": "getAssetAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x76d02895"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getAssetRate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x5896749a"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAssetsList",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xa73b870c"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "symbol",
          "type": "bytes32"
        },
        {
          "name": "rate",
          "type": "uint256"
        }
      ],
      "name": "addAsset",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xf0ea883b"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_rate",
          "type": "uint256"
        }
      ],
      "name": "updateAssetRate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x2a7619f2"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "removeAsset",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x4a5e42b1"
    }
  ],
  "address": "0x81d5edfF3799DeCB3aB93319Eefe1460a430C556"
}