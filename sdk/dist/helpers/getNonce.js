"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("../helpers/createInstance"),
    getProvider = _require.getProvider;

var _require2 = require("../helpers/errorHandler"),
    isAddress = _require2.isAddress;

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(address) {
    var web3, nonce;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isAddress({
              address: address
            });
            web3 = getProvider();
            _context.next = 4;
            return web3.eth.getTransactionCount(address);

          case 4:
            nonce = _context.sent;
            return _context.abrupt("return", nonce);

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