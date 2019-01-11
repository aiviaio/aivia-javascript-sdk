"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Proxy = require("../ABI/Proxy");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddress = _require2.isAddress,
    isInteger = _require2.isInteger,
    isString = _require2.isString;

var EntryPoint = require("./EntryPoint");

var utils = require("../utils");

var getRegistryAddress =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(key) {
    var proxyAddress, instance;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isString({
              key: key
            });
            _context.next = 3;
            return EntryPoint.getProxyAddress();

          case 3:
            proxyAddress = _context.sent;
            instance = createInstance(Proxy.abi, proxyAddress);
            return _context.abrupt("return", errorHandler(instance.methods.getRegistryAddress(utils.toHex(key)).call()));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRegistryAddress(_x) {
    return _ref.apply(this, arguments);
  };
}();

var isDeployer =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(deployerAddress) {
    var proxyAddress, instance;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isAddress({
              deployerAddress: deployerAddress
            });
            _context2.next = 3;
            return EntryPoint.getProxyAddress();

          case 3:
            proxyAddress = _context2.sent;
            instance = createInstance(Proxy.abi, proxyAddress);
            return _context2.abrupt("return", errorHandler(instance.methods.isDeployer(deployerAddress).call()));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function isDeployer(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var isAuditor =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(auditorAddress, type) {
    var proxyAddress, instance;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isAddress({
              auditorAddress: auditorAddress
            });
            isInteger({
              type: type
            });
            _context3.next = 4;
            return EntryPoint.getProxyAddress();

          case 4:
            proxyAddress = _context3.sent;
            instance = createInstance(Proxy.abi, proxyAddress);
            return _context3.abrupt("return", errorHandler(instance.methods.isAuditor(auditorAddress, type).call()));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function isAuditor(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  getRegistryAddress: getRegistryAddress,
  isDeployer: isDeployer,
  isAuditor: isAuditor
};