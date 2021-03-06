module.exports = [
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x715018a6"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf2fde38b"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "uIntStorageChange",
    "type": "event",
    "signature": "0x2ca5c572545026d42a9eb2b530b72b089c66a503e1d5c4744ff123ff872654a7"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "string"
      }
    ],
    "name": "stringStorageChange",
    "type": "event",
    "signature": "0x3757efb82f3ea33cd652bb091b12a0b1967e84e62c0815326a3bf0d8193676a1"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "address"
      }
    ],
    "name": "addressStorageChange",
    "type": "event",
    "signature": "0x5342ae08b2839db9b4c92d5ed6e4e390cd2b9d7f22169bea3f1e56ffe1ab5f4b"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "bytes"
      }
    ],
    "name": "bytesStorageChange",
    "type": "event",
    "signature": "0xa57c4677ddee4bc5c0c3b44ccd621c4f34f246d1807803f9b2d67b055cad1275"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "bool"
      }
    ],
    "name": "boolStorageChange",
    "type": "event",
    "signature": "0x529a9592477147be17141e90d1f16a642f50ab3286b5fedf4b347fc749da6cf1"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "int256"
      }
    ],
    "name": "intStorageChange",
    "type": "event",
    "signature": "0x3a1ee2e8c1311c3ae921a3d62ca15d77634796a934346e2bb9e112933952d0d1"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipRenounced",
    "type": "event",
    "signature": "0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event",
    "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "getAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x21f8a721"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "getUint",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xbd02d0f5"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "getString",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x986e791a"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "getBytes",
    "outputs": [
      {
        "name": "",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xc031a180"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "getBool",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x7ae1cfca"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "getInt",
    "outputs": [
      {
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xdc97d962"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_value",
        "type": "address"
      }
    ],
    "name": "setAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xca446dd9"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setUint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe2a4853a"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_value",
        "type": "string"
      }
    ],
    "name": "setString",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x6e899550"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_value",
        "type": "bytes"
      }
    ],
    "name": "setBytes",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2e28d084"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_value",
        "type": "bool"
      }
    ],
    "name": "setBool",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xabfdcced"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_value",
        "type": "int256"
      }
    ],
    "name": "setInt",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x3e49bed0"
  }
]