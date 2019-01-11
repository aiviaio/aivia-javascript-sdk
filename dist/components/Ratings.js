"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var AssetsRegistry = require("./AssetsRegistry");

var Asset = require("./Asset");

var _require = require("../helpers/errorHandler"),
    errorHandler = _require.errorHandler;

var getRatingsList =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var addressesList, tokensList;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return errorHandler(AssetsRegistry.getList());

          case 2:
            addressesList = _context2.sent;
            tokensList = addressesList.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(_ref2) {
                var address, symbol, price, investors;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        address = _ref2.address;
                        _context.next = 3;
                        return errorHandler(AssetsRegistry.getAssetSymbol(address));

                      case 3:
                        symbol = _context.sent;
                        _context.next = 6;
                        return errorHandler(Asset.getRate(address));

                      case 6:
                        price = _context.sent;
                        _context.next = 9;
                        return errorHandler(Asset.getInvestors(address));

                      case 9:
                        investors = _context.sent;
                        return _context.abrupt("return", {
                          symbol: symbol,
                          address: address,
                          investors: investors,
                          price: price
                        });

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x) {
                return _ref3.apply(this, arguments);
              };
            }());
            return _context2.abrupt("return", Promise.all(tokensList));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getRatingsList() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  getRatingsList: getRatingsList
};