"use strict";

var CryptoHedge = require("./CryptoHedge");

var input = function input(type, params) {
  var list = {
    1: CryptoHedge.input(params)
  };
  return Object.values(list[type]);
};

var output = function output(type, params) {
  var list = {
    1: CryptoHedge.output(params)
  };
  return list[type];
};

module.exports = {
  input: input,
  output: output
};