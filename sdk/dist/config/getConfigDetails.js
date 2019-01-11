"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var CryptoHedge = require("./CryptoHedge");

var Config = require("../ABI/ProjectConfig");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddress = _require2.isAddress;

var utils = require("../utils");

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(configAddress) {
    var instance, type, list;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isAddress({
              configAddress: configAddress
            });
            instance = createInstance(Config.abi, configAddress);
            _context.next = 4;
            return errorHandler(instance.methods.getConstUint(utils.toHex("type")).call());

          case 4:
            type = _context.sent;
            _context.next = 7;
            return CryptoHedge(instance);

          case 7:
            _context.t0 = _context.sent;
            list = {
              1: _context.t0
            };
            return _context.abrupt("return", list[type]);

          case 10:
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