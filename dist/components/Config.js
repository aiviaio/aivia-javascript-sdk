"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var Error = require("../helpers/Error");

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddress = _require2.isAddress,
    isInteger = _require2.isInteger,
    isNumber = _require2.isNumber,
    isArray = _require2.isArray,
    isString = _require2.isString;

var getConfigDetails = require("../config/getConfigDetails");

var ABI = require("../helpers/utility-abi");

var signedTX = require("../helpers/signedTX");

var ETERNAL_STORAGE_ABI = require("../ABI/EternalStorage");

var utils = require("../utils");

var Asset = require("./Asset");

var ERC20 = require("./ERC20");

var fields = {
  uint: ["maxTokens", "maxInvestors"],
  fees: ["platformFee", "entryFee", "exitFee"],
  names: ["projectName", "tokenName"]
};
/**
 * @module Project
 * @typicalname SDK.project
 */

/**
 * returns config address
 * @param {address} assetAddress
 * @returns {address} config address
 */

exports.getConfigAddress =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(assetAddress) {
    var instance, configAddress;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isAddress({
              assetAddress: assetAddress
            });
            instance = createInstance(ABI.config, assetAddress);
            _context.next = 4;
            return errorHandler(instance.methods.config().call());

          case 4:
            configAddress = _context.sent;
            return _context.abrupt("return", configAddress);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * returns config by config address
 * @param {string|address} configAddress
 * @returns {object} config
 */


exports.getConfig =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(assetAddress) {
    var instance, configAddress, config;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isAddress({
              assetAddress: assetAddress
            });
            instance = createInstance(ABI.config, assetAddress);
            _context2.next = 4;
            return errorHandler(instance.methods.config().call());

          case 4:
            configAddress = _context2.sent;
            _context2.next = 7;
            return errorHandler(getConfigDetails(configAddress));

          case 7:
            config = _context2.sent;
            return _context2.abrupt("return", config);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getConfigDirectly =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(configAddress) {
    var config;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isAddress({
              configAddress: configAddress
            });
            _context3.next = 3;
            return errorHandler(getConfigDetails(configAddress));

          case 3:
            config = _context3.sent;
            return _context3.abrupt("return", config);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * update project config
 * @param {address} configAddress asset address that will be sold
 * @param {string} key field name
 * @param {number} countryID country ID
 * @param {array.<number>} walletTypes wallets types array
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {transaction}
 */


exports.updatePermission =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(configAddress, countryID, walletTypes, options, callback, estimate) {
    var instance, action;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            isAddress({
              configAddress: configAddress
            });
            isInteger({
              countryID: countryID
            });
            isArray({
              walletTypes: walletTypes
            });
            instance = createInstance(ABI.updatePermission, configAddress);
            _context4.next = 6;
            return errorHandler(instance.methods.updatePermissionByCountry(countryID, walletTypes));

          case 6:
            action = _context4.sent;
            _context4.next = 9;
            return errorHandler(signedTX({
              data: action,
              from: options.from,
              to: configAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              nonce: options.nonce,
              callback: callback,
              estimate: estimate
            }));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x4, _x5, _x6, _x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * update project config
 * @param {address} configAddress asset address that will be sold
 * @param {string} key field name
 * @param {number|string} value new value
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {transaction}
 */


exports.update =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(configAddress, key, value, options, callback, estimate) {
    var instance, _key, action, _ref6, token, investors, totalSupply, tx;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (![].concat((0, _toConsumableArray2.default)(fields.names), (0, _toConsumableArray2.default)(fields.fees), (0, _toConsumableArray2.default)(fields.uint)).includes(key)) {
              Error({
                name: "params",
                message: "field ".concat(key, " can not be updated")
              });
            }

            instance = createInstance(ETERNAL_STORAGE_ABI, configAddress);
            _key = utils.toHex(key);
            action = null;

            if (!fields.names.includes(key)) {
              _context5.next = 9;
              break;
            }

            isString({
              value: value
            });
            _context5.next = 8;
            return errorHandler(instance.methods.setBytes(_key, utils.toHex(value)));

          case 8:
            action = _context5.sent;

          case 9:
            if (!fields.uint.includes(key)) {
              _context5.next = 28;
              break;
            }

            isInteger({
              value: value
            });
            _context5.next = 13;
            return module.exports.getConfigDirectly(configAddress);

          case 13:
            _ref6 = _context5.sent;
            token = _ref6.token;

            if (!(key === "maxInvestors")) {
              _context5.next = 20;
              break;
            }

            _context5.next = 18;
            return Asset.getInvestors(token);

          case 18:
            investors = _context5.sent;

            if (investors > value) {
              Error({
                name: "params",
                message: "There are already ".concat(investors, " investors, the new value should be either equal to ").concat(investors, " or more")
              });
            }

          case 20:
            if (!(key === "maxTokens")) {
              _context5.next = 25;
              break;
            }

            _context5.next = 23;
            return ERC20.totalSupply(token);

          case 23:
            totalSupply = _context5.sent;

            if (totalSupply > value) {
              Error({
                name: "params",
                message: "There are already ".concat(totalSupply, "  tokens, the new value should be either equal to ").concat(totalSupply, " or more")
              });
            }

          case 25:
            _context5.next = 27;
            return errorHandler(instance.methods.setUint(_key, utils.numberToHex(value)));

          case 27:
            action = _context5.sent;

          case 28:
            if (!fields.fees.includes(key)) {
              _context5.next = 33;
              break;
            }

            isNumber({
              value: value
            });
            _context5.next = 32;
            return errorHandler(instance.methods.setUint(_key, utils.toWei(value)));

          case 32:
            action = _context5.sent;

          case 33:
            _context5.next = 35;
            return errorHandler(signedTX({
              data: action,
              from: options.from,
              to: configAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              nonce: options.nonce,
              callback: callback,
              estimate: estimate
            }));

          case 35:
            tx = _context5.sent;
            return _context5.abrupt("return", tx);

          case 37:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x10, _x11, _x12, _x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();