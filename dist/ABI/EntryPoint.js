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
  "type": "function",
  "signature": "0xe25a37b4"
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
  "type": "function",
  "signature": "0xf720f80b"
}, {
  "inputs": [{
    "name": "_DGStorageAddress",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor",
  "signature": "constructor"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "setInitialProxyAddress",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x2bde75ef"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "setProxyAddress",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x46a7dadc"
}, {
  "constant": true,
  "inputs": [],
  "name": "getProxyAddress",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x43a73d9a"
}];