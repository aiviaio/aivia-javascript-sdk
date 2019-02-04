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
    "name": "_address",
    "type": "address"
  }],
  "name": "Change",
  "type": "event"
}, {
  "constant": true,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "isCustodian",
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
    "name": "_address",
    "type": "address"
  }, {
    "name": "_name",
    "type": "bytes32"
  }],
  "name": "addCustodian",
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
    "name": "_contract",
    "type": "address"
  }],
  "name": "addContractAddress",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "getCustodianDetails",
  "outputs": [{
    "name": "",
    "type": "bytes32"
  }, {
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
  }],
  "name": "removeCustodian",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getCustodiansList",
  "outputs": [{
    "name": "",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}];