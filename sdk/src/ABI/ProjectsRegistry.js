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
      "name": "Proxy",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xfd782de5"
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
          "indexed": true,
          "name": "_projectAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_configAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "addProjectEvent",
      "type": "event",
      "signature": "0xfbfc09e203b168fe6fc38e7404088abf9ec50502635a4cb738f64f915d0ed751"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_projectAddress",
          "type": "address"
        },
        {
          "name": "_configAddress",
          "type": "address"
        },
        {
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "name": "_owner",
          "type": "address"
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
      "signature": "0xc12126c6"
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
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x54253b7d"
    }
  ],
  "address": "0x0fCD63BB65a939B947FA99e9CbC6838464a937A0"
}