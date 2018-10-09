module.exports = {
  "ABI": [
    {
      "constant": true,
      "inputs": [],
      "name": "entryPointAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x06dc245c"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "projectAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x3cf96af1"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "projectRegistry",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x5a33d8dc"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "projectAuditAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8c861ef4"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "platformTokenContract",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x9af6120c"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "tokenAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x9d76ea58"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "platformRegistry",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xc255f878"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "platformToken",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xd1b812cd"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "configAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xd6c31871"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "platformWallet",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xfa2af9da"
    },
    {
      "inputs": [
        {
          "name": "_projectRegistryAddress",
          "type": "address"
        },
        {
          "name": "_platformRegistryAddress",
          "type": "address"
        },
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_projectAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_configAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "NewProject",
      "type": "event",
      "signature": "0x782f1e9661594ee5ba2fa92f67d07637f1fcdc0eae2118dbfb5d1842a58ada88"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_names",
          "type": "bytes32[]"
        },
        {
          "name": "_params",
          "type": "uint256[]"
        },
        {
          "name": "_fees",
          "type": "uint256[]"
        },
        {
          "name": "_custodian",
          "type": "address"
        }
      ],
      "name": "deployProject",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x6d2e79a5"
    }
  ],
  "address": "0xdb3c550c67F090CCb5D2e664d00F19d8686e1276"
}