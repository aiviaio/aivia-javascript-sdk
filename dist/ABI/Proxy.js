"use strict";

module.exports = [{
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
    "name": "_ProxyRegistryAddress",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "owner",
    "type": "address"
  }, {
    "indexed": false,
    "name": "components",
    "type": "address[]"
  }],
  "name": "NewProject",
  "type": "event"
}, {
  "constant": true,
  "inputs": [{
    "name": "_key",
    "type": "bytes32"
  }],
  "name": "getRegistryAddress",
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
  }, {
    "name": "_type",
    "type": "uint8"
  }],
  "name": "isAuditor",
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
  "name": "isDeployer",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_type",
    "type": "uint8"
  }, {
    "name": "_bytesArray",
    "type": "bytes32[]"
  }, {
    "name": "_uintArray",
    "type": "uint256[]"
  }, {
    "name": "_addressArray",
    "type": "address[]"
  }, {
    "name": "_countries",
    "type": "uint8[]"
  }, {
    "name": "_walletTypes",
    "type": "uint8[]"
  }, {
    "name": "permissionRule",
    "type": "bool"
  }],
  "name": "deployProject",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "initProject",
  "outputs": [{
    "name": "",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_config",
    "type": "address"
  }],
  "name": "updateRPC",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];