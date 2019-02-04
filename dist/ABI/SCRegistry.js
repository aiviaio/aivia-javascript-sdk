"use strict";

module.exports = [{
  "constant": true,
  "inputs": [],
  "name": "isProxyAddress",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "isDGAddress",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "isMaster",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "name": "_DGStorageAddress",
    "type": "address"
  }, {
    "name": "_EntryPointAddress",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "eventName",
    "type": "bytes32"
  }, {
    "indexed": true,
    "name": "symbol",
    "type": "bytes32"
  }, {
    "indexed": true,
    "name": "_address",
    "type": "address"
  }],
  "name": "registryEvent",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_rate",
    "type": "uint256"
  }, {
    "indexed": true,
    "name": "_address",
    "type": "address"
  }, {
    "indexed": true,
    "name": "_auditor",
    "type": "address"
  }],
  "name": "updateRate",
  "type": "event"
}, {
  "constant": true,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "getAssetByAddress",
  "outputs": [{
    "name": "",
    "type": "bytes32"
  }, {
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "getSymbol",
  "outputs": [{
    "name": "",
    "type": "bytes32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_symbol",
    "type": "bytes32"
  }],
  "name": "getAssetAddress",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "getAssetRate",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getAssetsList",
  "outputs": [{
    "name": "",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }, {
    "name": "symbol",
    "type": "bytes32"
  }, {
    "name": "rate",
    "type": "uint256"
  }],
  "name": "addAsset",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }, {
    "name": "_rate",
    "type": "uint256"
  }],
  "name": "updateAssetRate",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "removeAsset",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];