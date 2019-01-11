"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Audit = require("../ABI/ProjectAudit");

var RPC_ABI = require("../ABI/RPC");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddressOrSymbol = _require2.isAddressOrSymbol,
    isAddress = _require2.isAddress,
    isString = _require2.isString,
    isNumber = _require2.isNumber;

var AssetsRegistry = require("./AssetsRegistry");

var Config = require("./Config");

var signedTX = require("../helpers/signedTX");

var utils = require("../utils");
/**
 * @module Asset
 * @typicalname SDK.asset
 */


var getAddressWithKey =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(addressOrSymbol) {
    var address;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isAddressOrSymbol({
              addressOrSymbol: addressOrSymbol
            });

            if (!utils.isAddress(addressOrSymbol)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", addressOrSymbol);

          case 3:
            _context.next = 5;
            return errorHandler(AssetsRegistry.getAssetAddress(addressOrSymbol));

          case 5:
            address = _context.sent;
            return _context.abrupt("return", address);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getAddressWithKey(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * returns AuditDB address
 * @param {String|Address} addressOrSymbol
 * @returns {AuditDBAddress} AuditDB address
 */


exports.getAuditDBAddress =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(addressOrSymbol) {
    var address, _ref3, auditDB;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isAddressOrSymbol({
              addressOrSymbol: addressOrSymbol
            });
            _context2.next = 3;
            return getAddressWithKey(addressOrSymbol);

          case 3:
            address = _context2.sent;
            _context2.next = 6;
            return errorHandler(Config.getConfig(address));

          case 6:
            _ref3 = _context2.sent;
            auditDB = _ref3.auditDB;
            return _context2.abrupt("return", auditDB);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * returns asset RPC address
 * @param {String|Address} addressOrSymbol
 * @returns {RPCAddress} RPC address
 */


exports.getRPCAddress =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(addressOrSymbol) {
    var address, _ref5, RPC;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isAddressOrSymbol({
              addressOrSymbol: addressOrSymbol
            });
            _context3.next = 3;
            return errorHandler(getAddressWithKey(addressOrSymbol));

          case 3:
            address = _context3.sent;
            _context3.next = 6;
            return Config.getConfig(address);

          case 6:
            _ref5 = _context3.sent;
            RPC = _ref5.RPC;
            return _context3.abrupt("return", RPC);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * returns asset rate by address or symbol
 * @param {String|Address} addressOrSymbol
 * @returns {rate} current(last) rate
 */


exports.getRate =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(addressOrSymbol) {
    var auditDB, instance, price;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            isAddressOrSymbol({
              addressOrSymbol: addressOrSymbol
            });
            _context4.next = 3;
            return errorHandler(module.exports.getAuditDBAddress(addressOrSymbol));

          case 3:
            auditDB = _context4.sent;
            instance = createInstance(Audit.abi, auditDB);
            _context4.next = 7;
            return errorHandler(instance.methods.getLastPrice().call());

          case 7:
            price = _context4.sent;
            return _context4.abrupt("return", utils.fromWei(price));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x4) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * function to update the price of the asset rate
 * @access only auditors
 * @param {address} assetAddress asset address
 * @param {number} AUM project total aum
 * @param {string} checksum md5 checksum
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @returns {event} transaction event {rate, auditor}
 */


exports.updateRate =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(assetAddress, AUM, checksum, options) {
    var _AUM, auditDB, instance, timestamp, action, transaction, _ref8, blockNumber, Events, _Events$map, _Events$map2, Event;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            isAddress({
              assetAddress: assetAddress
            });
            isNumber({
              AUM: AUM
            });
            isString({
              checksum: checksum
            });
            _AUM = AUM < 0 ? 0 : utils.toWei(AUM);
            _context5.next = 6;
            return errorHandler(module.exports.getAuditDBAddress(assetAddress));

          case 6:
            auditDB = _context5.sent;
            instance = createInstance(Audit.abi, auditDB);
            timestamp = Math.floor(Date.now() / 1000);
            _context5.next = 11;
            return errorHandler(instance.methods.updateRate(_AUM, timestamp, utils.toHex(checksum)));

          case 11:
            action = _context5.sent;
            transaction = signedTX({
              data: action,
              from: options.from,
              to: auditDB,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              nonce: options.nonce
            });
            _context5.next = 15;
            return errorHandler(transaction);

          case 15:
            _ref8 = _context5.sent;
            blockNumber = _ref8.blockNumber;
            _context5.next = 19;
            return errorHandler(instance.getPastEvents("updateAudit", {
              filter: {
                to: auditDB,
                from: options.from
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            }));

          case 19:
            Events = _context5.sent;
            _Events$map = Events.map(function (event) {
              var returnValues = event.returnValues;

              var _Object$values = Object.values(returnValues),
                  _Object$values2 = (0, _slicedToArray2.default)(_Object$values, 2),
                  _price = _Object$values2[0],
                  _auditor = _Object$values2[1];

              return {
                rate: utils.fromWei(_price),
                auditor: _auditor
              };
            }), _Events$map2 = (0, _slicedToArray2.default)(_Events$map, 1), Event = _Events$map2[0];
            return _context5.abrupt("return", Event);

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x5, _x6, _x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * returns asset NET by address or symbol
 * @param {String|Address} addressOrSymbol
 * @returns {NET}
 */


exports.NET =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(addressOrSymbol) {
    var auditDB, instance, value;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            isAddressOrSymbol({
              addressOrSymbol: addressOrSymbol
            });
            _context6.next = 3;
            return errorHandler(module.exports.getAuditDBAddress(addressOrSymbol));

          case 3:
            auditDB = _context6.sent;
            instance = createInstance(Audit.abi, auditDB);
            _context6.next = 7;
            return errorHandler(instance.methods.NET().call());

          case 7:
            value = _context6.sent;
            return _context6.abrupt("return", utils.toFixed(utils.fromWei(value)));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x9) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * returns asset investors count by address
 * @param {address} addressOrSymbol
 * @returns {investors}
 */


exports.getInvestors =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(assetAddress) {
    var RPC, instance, investors;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            isAddress({
              assetAddress: assetAddress
            });
            _context7.next = 3;
            return errorHandler(module.exports.getRPCAddress(assetAddress));

          case 3:
            RPC = _context7.sent;
            instance = createInstance(RPC_ABI.abi, RPC);
            _context7.next = 7;
            return errorHandler(instance.methods.getInvestorsCount().call());

          case 7:
            investors = _context7.sent;
            return _context7.abrupt("return", Number(investors));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x10) {
    return _ref10.apply(this, arguments);
  };
}();