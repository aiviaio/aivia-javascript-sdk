"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var SC_REGISTRY_ABI = require("../ABI/SCRegistry");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddressOrSymbol = _require2.isAddressOrSymbol,
    isString = _require2.isString,
    isAddress = _require2.isAddress;

var Proxy = require("./Proxy");

var utils = require("../utils");
/**
 * @module Currency
 * @typicalname SDK.platform.currency
 */

/**
 * returns platform currencies list
 * @returns {currenciesList[]}
 * @property {object} currenciesList.item
 * @property {string} item.symbol
 * @property {string} item.address
 * @property {number} item.rate
 */


exports.getList =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee2() {
  var registryAddress, instance, addressesList, assetsList;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Proxy.getRegistryAddress("cryptocurrencies");

        case 2:
          registryAddress = _context2.sent;
          instance = createInstance(SC_REGISTRY_ABI, registryAddress);
          _context2.next = 6;
          return errorHandler(instance.methods.getAssetsList().call());

        case 6:
          addressesList = _context2.sent;
          assetsList = addressesList.map(
          /*#__PURE__*/
          function () {
            var _ref2 = (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee(address) {
              var assets, _Object$values, _Object$values2, assetsSymbol, assetsRate, symbol, rate;

              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return instance.methods.getAssetByAddress(address).call();

                    case 2:
                      assets = _context.sent;
                      _Object$values = Object.values(assets), _Object$values2 = (0, _slicedToArray2.default)(_Object$values, 2), assetsSymbol = _Object$values2[0], assetsRate = _Object$values2[1];
                      symbol = utils.toUtf8(assetsSymbol);
                      rate = utils.fromWei(assetsRate);
                      return _context.abrupt("return", {
                        symbol: symbol,
                        address: address,
                        rate: rate
                      });

                    case 7:
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
          return _context2.abrupt("return", Promise.all(assetsList));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));
/**
 * returns  currency rate by address or symbol
 * @param {string|address} addressOrSymbol
 * @returns {rate} - rate of currency
 */

exports.getRate =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(addressOrSymbol) {
    var registryAddress, instance, _rate, assetAddress, rate;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isAddressOrSymbol({
              addressOrSymbol: addressOrSymbol
            });
            _context3.next = 3;
            return Proxy.getRegistryAddress("cryptocurrencies");

          case 3:
            registryAddress = _context3.sent;
            instance = createInstance(SC_REGISTRY_ABI, registryAddress);

            if (!utils.isAddress(addressOrSymbol)) {
              _context3.next = 10;
              break;
            }

            _context3.next = 8;
            return errorHandler(instance.methods.getAssetRate(addressOrSymbol).call());

          case 8:
            _rate = _context3.sent;
            return _context3.abrupt("return", utils.fromWei(_rate));

          case 10:
            _context3.next = 12;
            return errorHandler(instance.methods.getAssetAddress(utils.toHex(addressOrSymbol)).call());

          case 12:
            assetAddress = _context3.sent;
            _context3.next = 15;
            return errorHandler(instance.methods.getAssetRate(assetAddress).call());

          case 15:
            rate = _context3.sent;
            return _context3.abrupt("return", utils.fromWei(rate));

          case 17:
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
 * returns currency address by symbol
 * @param {string} symbol
 * @returns {address} currency address
 */


exports.getAddress =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(symbol) {
    var registryAddress, instance, assetAddress;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            isString({
              symbol: symbol
            });
            _context4.next = 3;
            return Proxy.getRegistryAddress("cryptocurrencies");

          case 3:
            registryAddress = _context4.sent;
            instance = createInstance(SC_REGISTRY_ABI, registryAddress);
            _context4.next = 7;
            return errorHandler(instance.methods.getAssetAddress(utils.toHex(symbol)).call());

          case 7:
            assetAddress = _context4.sent;
            return _context4.abrupt("return", assetAddress);

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
/**
 * returns currency symbol by address
 * @param {address} currencyAddress
 * @returns {symbol} currency symbol
 */


exports.getSymbol =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(currencyAddress) {
    var registryAddress, instance, hexSymbol;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            isAddress({
              currencyAddress: currencyAddress
            });
            _context5.next = 3;
            return Proxy.getRegistryAddress("cryptocurrencies");

          case 3:
            registryAddress = _context5.sent;
            instance = createInstance(SC_REGISTRY_ABI, registryAddress);
            _context5.next = 7;
            return errorHandler(instance.methods.getSymbol(currencyAddress).call());

          case 7:
            hexSymbol = _context5.sent;
            return _context5.abrupt("return", utils.toUtf8(hexSymbol));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x4) {
    return _ref5.apply(this, arguments);
  };
}();