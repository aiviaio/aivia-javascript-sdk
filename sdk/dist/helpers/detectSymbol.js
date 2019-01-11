"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var utils = require("../utils");

var ABI = require("./utility-abi");

var _require = require("./createInstance"),
    createInstance = _require.createInstance;

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(assetAddress) {
    var symbol, instance;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            symbol = "";
            instance = null;
            instance = createInstance(ABI.bytes32Symbol, assetAddress);
            _context.t0 = utils;
            _context.next = 6;
            return instance.methods.symbol().call();

          case 6:
            _context.t1 = _context.sent;
            symbol = _context.t0.toUtf8.call(_context.t0, _context.t1);

            if (symbol.trim().length) {
              _context.next = 13;
              break;
            }

            instance = createInstance(ABI.stringSymbol, assetAddress);
            _context.next = 12;
            return instance.methods.symbol().call();

          case 12:
            symbol = _context.sent;

          case 13:
            return _context.abrupt("return", symbol);

          case 14:
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