"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddress = _require2.isAddress,
    isInteger = _require2.isInteger,
    isArray = _require2.isArray;

var getConfigDetails = require("../config/getConfigDetails");

var ABI = require("../helpers/utility-abi");

var signedTX = require("../helpers/signedTX");

var getConfig =
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

  return function getConfig(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getConfigDirectly =
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

  return function getConfigDirectly(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var updatePermission =
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

  return function updatePermission(_x3, _x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  getConfig: getConfig,
  getConfigDirectly: getConfigDirectly,
  updatePermission: updatePermission
};