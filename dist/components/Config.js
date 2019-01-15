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
 * returns config by config address
 * @param {string|address} configAddress
 * @returns {object} config
 */

exports.getConfig =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(assetAddress) {
    var instance, configAddress, config;
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
            _context.next = 7;
            return errorHandler(getConfigDetails(configAddress));

          case 7:
            config = _context.sent;
            return _context.abrupt("return", config);

          case 9:
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

exports.getConfigDirectly =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(configAddress) {
    var config;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isAddress({
              configAddress: configAddress
            });
            _context2.next = 3;
            return errorHandler(getConfigDetails(configAddress));

          case 3:
            config = _context2.sent;
            return _context2.abrupt("return", config);

          case 5:
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
/**
 * update project config
 * @param {address} configAddress asset address that will be sold
 * @param {string} key field name
 * @param {number} countryID country ID
 *  @param {array.<number>} walletTypes wallets types array
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {transaction}
 */


exports.updatePermission =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(configAddress, countryID, walletTypes, options, callback) {
    var instance, action;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
            _context3.next = 6;
            return errorHandler(instance.methods.updatePermissionByCountry(countryID, walletTypes));

          case 6:
            action = _context3.sent;
            _context3.next = 9;
            return errorHandler(signedTX({
              data: action,
              from: options.from,
              to: configAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              callback: callback
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3, _x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
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
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {transaction}
 */


exports.update =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(configAddress, key, value, options, callback) {
    var instance, _key, action, tx;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
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
              _context4.next = 9;
              break;
            }

            isString({
              value: value
            });
            _context4.next = 8;
            return errorHandler(instance.methods.setBytes(_key, utils.toHex(value)));

          case 8:
            action = _context4.sent;

          case 9:
            if (!fields.uint.includes(key)) {
              _context4.next = 14;
              break;
            }

            isInteger({
              value: value
            });
            _context4.next = 13;
            return errorHandler(instance.methods.setUint(_key, value));

          case 13:
            action = _context4.sent;

          case 14:
            if (!fields.fees.includes(key)) {
              _context4.next = 19;
              break;
            }

            isNumber({
              value: value
            });
            _context4.next = 18;
            return errorHandler(instance.methods.setUint(_key, utils.toWei(value)));

          case 18:
            action = _context4.sent;

          case 19:
            _context4.next = 21;
            return errorHandler(signedTX({
              data: action,
              from: options.from,
              to: configAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              callback: callback
            }));

          case 21:
            tx = _context4.sent;
            return _context4.abrupt("return", tx);

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x8, _x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();