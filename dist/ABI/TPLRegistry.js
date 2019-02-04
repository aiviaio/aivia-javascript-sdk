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
  "type": "function",
  "signature": "0xb88646e7"
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
  }, {
    "name": "_EntryPointAddress",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor",
  "signature": "constructor"
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
  "name": "registryEvent",
  "type": "event",
  "signature": "0x32b20f3349e58ed09ff3665fa7d4bf5093314b165c00f8a86ca7dcb91d78ffb5"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }, {
    "name": "_country",
    "type": "uint8"
  }, {
    "name": "_walletType",
    "type": "uint8"
  }, {
    "name": "_expirationDate",
    "type": "uint256"
  }],
  "name": "addUser",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xca0f2369"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }, {
    "name": "_expirationDate",
    "type": "uint256"
  }],
  "name": "updateUserExpirationDate",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xbb431814"
}, {
  "constant": true,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "getUserDetails",
  "outputs": [{
    "name": "",
    "type": "uint8"
  }, {
    "name": "",
    "type": "uint8"
  }, {
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xcc3d967b"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "removeUser",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x98575188"
}, {
  "constant": true,
  "inputs": [],
  "name": "getUsersList",
  "outputs": [{
    "name": "",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xc74e13f3"
}];