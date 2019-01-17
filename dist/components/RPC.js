"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Asset = require("./Asset");

var SCRegistry = require("./SCRegistry");

var ERC20 = require("./ERC20");

var Config = require("./Config");

var RPC_ABI = require("../ABI/RPC");

var ERC20ABI = require("../ABI/ERC20Mintable");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var signedTX = require("../helpers/signedTX");

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isNumber = _require2.isNumber,
    isAddress = _require2.isAddress;

var Error = require("../helpers/Error");

var utils = require("../utils");

var _require3 = require("../helpers/estimateTX"),
    estimateTX = _require3.estimateTX;

var storage = {};

var createCurrenciesInstances =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = storage.TUSDAddress;

            if (_context.t0) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return SCRegistry.getAddress("TUSD");

          case 4:
            _context.t0 = _context.sent;

          case 5:
            storage.TUSDAddress = _context.t0;
            _context.t1 = storage.AIVAddress;

            if (_context.t1) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return SCRegistry.getAddress("AIV");

          case 10:
            _context.t1 = _context.sent;

          case 11:
            storage.AIVAddress = _context.t1;
            storage.TUSD = storage.TUSD || createInstance(ERC20ABI, storage.TUSDAddress);
            storage.AIV = storage.AIV || createInstance(ERC20ABI, storage.AIVAddress);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createCurrenciesInstances() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @module Buy/Sell
 * @typicalname SDK.trade
 */

/**
 * the method by which you can first check the parameters before buy
 * @param {number} value the amount of the asset that
 * will be exchanged for the assets you want to buy
 * @param {address} assetAddress asset address that will be bought
 * @param {address} currencyAddress address of the asset to be sold
 * @param {address} from wallet address
 * @returns {true|error};
 */


exports.checkBeforeBuy =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(value, assetAddress, currencyAddress, from) {
    var balance;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isNumber({
              value: value
            });
            isAddress({
              assetAddress: assetAddress,
              currencyAddress: currencyAddress,
              from: from
            });
            _context2.next = 4;
            return createCurrenciesInstances();

          case 4:
            storage.asset = createInstance(ERC20ABI, assetAddress);
            storage.currency = createInstance(ERC20ABI, currencyAddress);
            _context2.next = 8;
            return storage.currency.methods.balanceOf(from).call();

          case 8:
            balance = _context2.sent;

            if (balance < Number(value)) {
              Error({
                name: "transaction",
                message: "Not enough funds on balance"
              });
            }

            return _context2.abrupt("return", true);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * purchase of tokens
 * @param {number} value the amount of the asset that
 * will be exchanged for the assets you want to buy
 * @param {address} assetAddress asset address that will be bought
 * @param {address} currencyAddress address of the asset to be sold
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {spend, received, fees: { manager, platform } }
 */


exports.buyAsset =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(value, assetAddress, currencyAddress, options, callback, estimate) {
    var RPCAddress, instance, action, _ref4, custodian, transaction, _ref5, blockNumber, feesRawEvents, _feesRawEvents$map, _feesRawEvents$map2, manager, platform, spendRawEvents, _spendRawEvents$map, _spendRawEvents$map2, spend, receivedRawEvents, _receivedRawEvents$ma, _receivedRawEvents$ma2, received;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return module.exports.checkBeforeBuy(value, assetAddress, currencyAddress, options.from);

          case 2:
            _context3.next = 4;
            return Asset.getRPCAddress(assetAddress);

          case 4:
            RPCAddress = _context3.sent;
            instance = createInstance(RPC_ABI, RPCAddress);
            action = instance.methods.buyAsset(utils.toWei(value), currencyAddress);
            _context3.next = 9;
            return Config.getConfig(assetAddress);

          case 9:
            _ref4 = _context3.sent;
            custodian = _ref4.custodian;

            if (estimate) {
              _context3.next = 21;
              break;
            }

            if (!(currencyAddress === storage.TUSDAddress)) {
              _context3.next = 21;
              break;
            }

            _context3.prev = 13;
            _context3.next = 16;
            return ERC20.approve(storage.TUSDAddress, RPCAddress, value, options);

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](13);
            Error({
              name: "transaction",
              message: "Not enough funds or not allowed to withdraw them"
            });

          case 21:
            transaction = signedTX({
              data: action,
              from: options.from,
              to: RPCAddress,
              action: "trade",
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              nonce: options.nonce,
              callback: callback,
              estimate: estimate
            });
            _context3.next = 24;
            return errorHandler(transaction);

          case 24:
            _ref5 = _context3.sent;
            blockNumber = _ref5.blockNumber;
            _context3.next = 28;
            return storage.AIV.getPastEvents("Transfer", {
              filter: {
                from: options.from
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            });

          case 28:
            feesRawEvents = _context3.sent;
            _feesRawEvents$map = feesRawEvents.map(function (event) {
              var returnValues = event.returnValues;
              return utils.fromWei(returnValues.value);
            }), _feesRawEvents$map2 = (0, _slicedToArray2.default)(_feesRawEvents$map, 2), manager = _feesRawEvents$map2[0], platform = _feesRawEvents$map2[1];
            _context3.next = 32;
            return storage.currency.getPastEvents("Transfer", {
              filter: {
                from: options.from,
                to: custodian
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            });

          case 32:
            spendRawEvents = _context3.sent;
            _spendRawEvents$map = spendRawEvents.map(function (event) {
              var returnValues = event.returnValues;
              return utils.fromWei(returnValues.value);
            }), _spendRawEvents$map2 = (0, _slicedToArray2.default)(_spendRawEvents$map, 1), spend = _spendRawEvents$map2[0];
            _context3.next = 36;
            return storage.asset.getPastEvents("Transfer", {
              filter: {
                to: options.from
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            });

          case 36:
            receivedRawEvents = _context3.sent;
            _receivedRawEvents$ma = receivedRawEvents.map(function (event) {
              var returnValues = event.returnValues;
              return utils.fromWei(returnValues.value);
            }), _receivedRawEvents$ma2 = (0, _slicedToArray2.default)(_receivedRawEvents$ma, 1), received = _receivedRawEvents$ma2[0];
            return _context3.abrupt("return", {
              spend: spend,
              received: received,
              fees: {
                manager: manager,
                platform: platform
              }
            });

          case 39:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[13, 18]]);
  }));

  return function (_x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * the method by which you can first check the parameters before sell
 * @param {number} value the amount of the asset that  will be sold
 * @param {address} assetAddress asset address that will be sold
 * @param {object} options
 * @param {address} options.address wallet address
 * @returns {true|error};
 */


exports.checkBeforeSell =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(value, assetAddress, from) {
    var balance;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            isNumber({
              value: value
            });
            isAddress({
              assetAddress: assetAddress,
              from: from
            });
            _context4.next = 4;
            return createCurrenciesInstances();

          case 4:
            storage.asset = createInstance(ERC20ABI, assetAddress);
            _context4.next = 7;
            return storage.asset.methods.balanceOf(from).call();

          case 7:
            balance = _context4.sent;

            if (balance < Number(value)) {
              Error({
                name: "transaction",
                message: "Not enough funds on balance"
              });
            }

            return _context4.abrupt("return", true);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * sale of tokens
 * @param {number} value the amount of the asset that will be sold
 * @param {address} assetAddress asset address that will be sold
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {spend, received, fees: { manager, platform } }
 */


exports.sellAsset =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(value, assetAddress, options, callback, estimate) {
    var RPCAddress, instance, action, transaction, _ref8, blockNumber, spendRawEvents, _spendRawEvents$map3, _spendRawEvents$map4, spend, receivedRawEvents, _receivedRawEvents$ma3, _receivedRawEvents$ma4, received, feesRawEvents, _feesRawEvents$map3, _feesRawEvents$map4, manager, platform;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return module.exports.checkBeforeSell(value, assetAddress, options.from);

          case 2:
            _context5.next = 4;
            return Asset.getRPCAddress(assetAddress);

          case 4:
            RPCAddress = _context5.sent;
            instance = createInstance(RPC_ABI, RPCAddress);
            action = instance.methods.sellAsset(utils.toWei(value));
            transaction = signedTX({
              data: action,
              from: options.from,
              to: RPCAddress,
              action: "trade",
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              nonce: options.nonce,
              callback: callback,
              estimate: estimate
            });
            _context5.next = 10;
            return errorHandler(transaction);

          case 10:
            _ref8 = _context5.sent;
            blockNumber = _ref8.blockNumber;
            _context5.next = 14;
            return storage.asset.getPastEvents("Transfer", {
              filter: {
                from: options.from,
                to: utils.ZERO_ADDRESS
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            });

          case 14:
            spendRawEvents = _context5.sent;
            _spendRawEvents$map3 = spendRawEvents.map(function (event) {
              var returnValues = event.returnValues;
              return utils.fromWei(returnValues.value);
            }), _spendRawEvents$map4 = (0, _slicedToArray2.default)(_spendRawEvents$map3, 1), spend = _spendRawEvents$map4[0];
            _context5.next = 18;
            return storage.TUSD.getPastEvents("Transfer", {
              filter: {
                to: options.from
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            });

          case 18:
            receivedRawEvents = _context5.sent;
            _receivedRawEvents$ma3 = receivedRawEvents.map(function (event) {
              var returnValues = event.returnValues;
              return utils.fromWei(returnValues.value);
            }), _receivedRawEvents$ma4 = (0, _slicedToArray2.default)(_receivedRawEvents$ma3, 1), received = _receivedRawEvents$ma4[0];
            _context5.next = 22;
            return storage.AIV.getPastEvents("Transfer", {
              filter: {
                from: options.from
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            });

          case 22:
            feesRawEvents = _context5.sent;
            _feesRawEvents$map3 = feesRawEvents.map(function (event) {
              var returnValues = event.returnValues;
              return utils.fromWei(returnValues.value);
            }), _feesRawEvents$map4 = (0, _slicedToArray2.default)(_feesRawEvents$map3, 2), manager = _feesRawEvents$map4[0], platform = _feesRawEvents$map4[1];
            return _context5.abrupt("return", {
              spend: spend,
              received: received,
              fees: {
                manager: manager,
                platform: platform
              }
            });

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x14, _x15, _x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *
 * @param {number} value the amount of the asset
 * @param {address} assetAddress asset address
 * @param {address=} currencyAddress currency address
 * @returns {estimate};
 */


exports.estimate = function (value, assetAddress, currencyAddress) {
  return estimateTX(value, assetAddress, currencyAddress);
};