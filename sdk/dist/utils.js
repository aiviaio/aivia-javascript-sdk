"use strict";

var is = require("is_js");

var web3 = require("web3");
/**
 * @module utils
 * @typicalname SDK.utils
 */


exports.is = is;
/**
 * convert string to hex
 * @param {string} string
 * @returns {hex} the resulting HEX string;
 */

exports.toHex = function (string) {
  return web3.utils.utf8ToHex(string);
};
/**
 * converts any value value into wei
 * @param {number} value
 * @returns {value}
 */


exports.toWei = function (value) {
  return web3.utils.toWei(value.toString(), "ether");
};
/**
 * converts any value from wei
 * @param {number} value
 * @returns {value} ;
 */


exports.fromWei = function (value, isString) {
  var balance = web3.utils.fromWei("".concat(value || 0), "ether");

  if (isString) {
    return balance;
  }

  return Number(balance);
};
/**
 * check if a given string is a valid Ethereum address
 * @param {address} address
 * @returns {boolean} status;
 */


exports.isAddress = function (address) {
  return web3.utils.isAddress(address);
};
/**
 * converts any value from hex to string
 * @param {string} hex
 * @returns {string} ;
 */


exports.toUtf8 = function (hex) {
  return web3.utils.toUtf8(hex);
};
/**
 * formats a number using fixed-point notation
 * @param {number} value
 * @param {number} [digits=5] digits it's number of digits to appear after the decimal point;
 * @returns {value}
 */


exports.toFixed = function (value) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  return Number(value.toFixed(digits));
};
/**
 * covert number to hex
 * @param {value} value
 * @returns {string} number;
 */


exports.numberToHex = function (value) {
  return web3.utils.numberToHex(web3.utils.toWei(value.toString(), "ether"));
};

exports.ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";