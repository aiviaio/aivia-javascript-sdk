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
      "inputs": [
        {
          "name": "_DGStorageAddress",
          "type": "address"
        },
        {
          "name": "_EntryPointAddress",
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
          "name": "_configAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_projectType",
          "type": "uint256"
        }
      ],
      "name": "NewProject",
      "type": "event",
      "signature": "0xfbb8da64a8e12e8f5141154359f8c8c1feb1425e6c90d6eb018c1757dbbaf882"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_configAddress",
          "type": "address"
        },
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_projectType",
          "type": "uint256"
        }
      ],
      "name": "addProject",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xf35e746e"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getProjectByID",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x54253b7d"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getProjectLength",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x0e539a46"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_configAddress",
          "type": "address"
        }
      ],
      "name": "getProjectID",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xaee233b3"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_config",
          "type": "address"
        }
      ],
      "name": "getProjectType",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xc1ee792a"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getProjectsList",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x61c2c5c8"
    }
  ],
  "address": "0x720cfE747eB65fC13dF776a9d00fa63449E06d49"
}