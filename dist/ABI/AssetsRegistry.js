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
  }, {
    "indexed": true,
    "name": "_symbol",
    "type": "bytes32"
  }],
  "name": "registryEvent",
  "type": "event",
  "signature": "0x29aec1f0e96a7c5b41464f2d357960e9f988a188c9bca53b9abdf48acdb6012b"
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
  "type": "function",
  "signature": "0xc9b2e522"
}, {
  "constant": true,
  "inputs": [{
    "name": "_symbol",
    "type": "bytes32"
  }],
  "name": "getAddress",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x21f8a721"
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
  "type": "function",
  "signature": "0xa73b870c"
}, {
  "constant": true,
  "inputs": [{
    "name": "_symbol",
    "type": "bytes32"
  }],
  "name": "isSymbolExist",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x66f76bb0"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }, {
    "name": "_symbol",
    "type": "bytes32"
  }],
  "name": "addAsset",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x0ba07750"
}];