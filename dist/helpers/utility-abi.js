"use strict";

module.exports = {
  config: [{
    constant: true,
    inputs: [],
    name: "config",
    outputs: [{
      name: "",
      type: "address"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }],
  stringSymbol: [{
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{
      name: "",
      type: "string"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }],
  bytes32Symbol: [{
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{
      name: "",
      type: "bytes32"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }]
};