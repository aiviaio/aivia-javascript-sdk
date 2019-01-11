"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var EntryPoint = require("../ABI/EntryPoint");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler;

var config = require("../config");

var getProxyAddress =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var instance, address;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            instance = createInstance(EntryPoint.abi, config.get("ENTRY_POINT"));
            _context.next = 3;
            return errorHandler(instance.methods.getProxyAddress().call());

          case 3:
            address = _context.sent;
            return _context.abrupt("return", address);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getProxyAddress() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  getProxyAddress: getProxyAddress
};