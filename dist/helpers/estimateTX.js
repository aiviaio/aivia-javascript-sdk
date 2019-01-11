"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var utils = require("../utils");

var Asset = require("../components/Asset");

var SCRegistry = require("../components/SCRegistry");

var Config = require("../components/Config");

var storage = {
  rates: {}
};

var _getRate =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(address) {
    var isCurrency,
        currencyRate,
        assetRate,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isCurrency = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

            if (!storage.rates[address]) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", storage.rates[address]);

          case 3:
            if (!isCurrency) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return SCRegistry.getRate(address);

          case 6:
            currencyRate = _context.sent;
            storage.rates[address] = currencyRate;
            return _context.abrupt("return", currencyRate);

          case 9:
            _context.next = 11;
            return Asset.getRate(address);

          case 11:
            assetRate = _context.sent;
            storage.rates[address] = assetRate;
            return _context.abrupt("return", assetRate);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function _getRate(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _getAddress =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(symbol) {
    var address;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!storage.symbol) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", storage.symbol);

          case 2:
            _context2.next = 4;
            return SCRegistry.getAddress(symbol);

          case 4:
            address = _context2.sent;
            storage[symbol] = address;
            return _context2.abrupt("return", address);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function _getAddress(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var estimateBuy =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(value, assetAddress, currencyAddress) {
    var estimate, _ref4, entryFee, platformFee, assetRate, AIVRate, currencyRate, inUSD, platformFeeAmount, entryFeeAmount;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            estimate = {};
            _context3.next = 3;
            return Config.getConfig(assetAddress);

          case 3:
            _ref4 = _context3.sent;
            entryFee = _ref4.entryFee;
            platformFee = _ref4.platformFee;
            _context3.next = 8;
            return _getAddress("AIV");

          case 8:
            storage.AIV = _context3.sent;
            _context3.next = 11;
            return _getRate(assetAddress);

          case 11:
            assetRate = _context3.sent;
            _context3.next = 14;
            return _getRate(storage.AIV, true);

          case 14:
            AIVRate = _context3.sent;
            _context3.next = 17;
            return _getRate(currencyAddress, true);

          case 17:
            currencyRate = _context3.sent;
            inUSD = currencyRate * value;
            platformFeeAmount = inUSD * platformFee / 100;
            entryFeeAmount = inUSD * entryFee / 100;

            if (currencyAddress !== storage.AIV) {
              estimate.spend = value;
            } else {
              estimate.spend = utils.toFixed(inUSD / AIVRate);
            }

            estimate.received = utils.toFixed(inUSD / assetRate);
            estimate.fees = {
              platform: utils.toFixed(platformFeeAmount / AIVRate),
              manager: utils.toFixed(entryFeeAmount / AIVRate)
            };
            return _context3.abrupt("return", estimate);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function estimateBuy(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var estimateSell =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(value, assetAddress) {
    var estimate, _ref6, exitFee, platformFee, AIVRate, TUSDRate, assetRate, inUSD, platformFeeAmount, exitFeeAmount;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            estimate = {};
            _context4.next = 3;
            return _getAddress("TUSD");

          case 3:
            storage.TUSD = _context4.sent;
            _context4.next = 6;
            return _getAddress("AIV");

          case 6:
            storage.AIV = _context4.sent;
            _context4.next = 9;
            return Config.getConfig(assetAddress);

          case 9:
            _ref6 = _context4.sent;
            exitFee = _ref6.exitFee;
            platformFee = _ref6.platformFee;
            _context4.next = 14;
            return _getRate(storage.AIV, true);

          case 14:
            AIVRate = _context4.sent;
            _context4.next = 17;
            return _getRate(storage.TUSD, true);

          case 17:
            TUSDRate = _context4.sent;
            _context4.next = 20;
            return _getRate(assetAddress);

          case 20:
            assetRate = _context4.sent;
            inUSD = assetRate * value;
            platformFeeAmount = inUSD * platformFee / 100;
            exitFeeAmount = inUSD * exitFee / 100;
            estimate.spend = utils.toFixed(inUSD / assetRate);
            estimate.received = utils.toFixed(inUSD / TUSDRate);
            estimate.fees = {
              platform: utils.toFixed(platformFeeAmount / AIVRate),
              manager: utils.toFixed(exitFeeAmount / AIVRate)
            };
            return _context4.abrupt("return", estimate);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function estimateSell(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

var estimateTX = function estimateTX(value, assetAddress, currencyAddress) {
  if (currencyAddress) {
    return estimateBuy(value, assetAddress, currencyAddress);
  }

  return estimateSell(value, assetAddress);
};

var clearStorage = function clearStorage() {
  storage = {};
  return true;
};

module.exports = {
  estimateTX: estimateTX,
  clearStorage: clearStorage
};