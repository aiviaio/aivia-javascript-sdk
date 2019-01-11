"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var AssetsRegistry = require("../ABI/AssetsRegistry");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isString = _require2.isString,
    isAddress = _require2.isAddress;

var Proxy = require("./Proxy");

var utils = require("../utils");
/**
 * @module AssetsRegistry
 * @typicalname SDK.asset
 */

/**
 * returns assets list array
 * @returns {assetsList[]}
 * @property {object} assetsList.item
 * @property {string} item.symbol
 * @property {string} item.address
 */


exports.getList =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee2() {
  var registryAddress, instance, addressesList, tokensList;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Proxy.getRegistryAddress("tokens");

        case 2:
          registryAddress = _context2.sent;
          instance = createInstance(AssetsRegistry.abi, registryAddress);
          _context2.next = 6;
          return errorHandler(instance.methods.getAssetsList().call());

        case 6:
          addressesList = _context2.sent;
          tokensList = addressesList.map(
          /*#__PURE__*/
          function () {
            var _ref2 = (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee(address) {
              var hex, symbol;
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return errorHandler(instance.methods.getSymbol(address).call());

                    case 2:
                      hex = _context.sent;
                      symbol = utils.toUtf8(hex);
                      return _context.abrupt("return", {
                        symbol: symbol,
                        address: address
                      });

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }());
          return _context2.abrupt("return", Promise.all(tokensList));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));
/**
 * returns asset address by symbol
 * @param {string} symbol
 * @returns {address} asset address
 */

exports.getAssetAddress =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(symbol) {
    var registryAddress, instance, address;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isString({
              symbol: symbol
            });
            _context3.next = 3;
            return Proxy.getRegistryAddress("tokens");

          case 3:
            registryAddress = _context3.sent;
            instance = createInstance(AssetsRegistry.abi, registryAddress);
            _context3.next = 7;
            return errorHandler(instance.methods.getAddress(utils.toHex(symbol)).call());

          case 7:
            address = _context3.sent;
            return _context3.abrupt("return", address);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * returns asset symbol by address
 * @param {address} assetAddress
 * @returns {symbol} asset symbol
 */


exports.getAssetSymbol =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(assetAddress) {
    var registryAddress, instance, hexSymbol;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            isAddress({
              assetAddress: assetAddress
            });
            _context4.next = 3;
            return Proxy.getRegistryAddress("tokens");

          case 3:
            registryAddress = _context4.sent;
            instance = createInstance(AssetsRegistry.abi, registryAddress);
            _context4.next = 7;
            return errorHandler(instance.methods.getSymbol(assetAddress).call());

          case 7:
            hexSymbol = _context4.sent;
            return _context4.abrupt("return", utils.toUtf8(hexSymbol));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();