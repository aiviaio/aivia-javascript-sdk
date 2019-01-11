"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var PlatformRegistry = require("../ABI/PlatformRegistry");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler;

var utils = require("../utils");

var Proxy = require("./Proxy");
/**
 * @module Platform
 * @typicalname SDK.platform
 */

/**
 * returns platform wallet address
 * @returns {address}
 */


exports.getPlatformWallet =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var registryAddress, instance, address;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Proxy.getRegistryAddress("platform");

        case 2:
          registryAddress = _context.sent;
          instance = createInstance(PlatformRegistry.abi, registryAddress);
          _context.next = 6;
          return errorHandler(instance.methods.getAddress(utils.toHex("platformWallet")).call());

        case 6:
          address = _context.sent;
          return _context.abrupt("return", address);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));
/**
 * returns platform token address
 * @returns {address}
 */

exports.getPlatformToken =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee2() {
  var registryAddress, instance, address;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Proxy.getRegistryAddress("platform");

        case 2:
          registryAddress = _context2.sent;
          instance = createInstance(PlatformRegistry.abi, registryAddress);
          _context2.next = 6;
          return errorHandler(instance.methods.getAddress(utils.toHex("platformToken")).call());

        case 6:
          address = _context2.sent;
          return _context2.abrupt("return", address);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));