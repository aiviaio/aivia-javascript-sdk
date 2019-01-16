const is = require("is_js");
const web3 = require("web3");

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
exports.toHex = string => web3.utils.utf8ToHex(string);

/**
 * converts any value value into wei
 * @param {number} value
 * @returns {value}
 */
exports.toWei = value => web3.utils.toWei(value.toString(), "ether");

/**
 * converts any value from wei
 * @param {number} value
 * @returns {value} ;
 */
exports.fromWei = (value, isString) => {
  const balance = web3.utils.fromWei(`${value || 0}`, "ether");
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
exports.isAddress = address => web3.utils.isAddress(address);
/**
 * converts any value from hex to string
 * @param {string} hex
 * @returns {string} ;
 */
exports.toUtf8 = hex => web3.utils.toUtf8(hex);

/**
 * formats a number using fixed-point notation
 * @param {number} value
 * @param {number} [digits=5] digits it's number of digits to appear after the decimal point;
 * @returns {value}
 */
exports.toFixed = (value, digits = 5) => Number(value.toFixed(digits));

/**
 * covert number to hex
 * @param {value} value
 * @param {boolean} [inWei=false]
 * @returns {string} number;
 */
exports.numberToHex = (value, inWei = false) => {
  const _value = inWei ? web3.utils.toWei(value.toString(), "ether") : value;
  return web3.utils.numberToHex(_value);
};

/**
 * covert number to BN
 * @param {value} value
 * @returns {BN} BN;
 */
exports.BN = value => new web3.utils.BN(value.toString());

exports.ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
