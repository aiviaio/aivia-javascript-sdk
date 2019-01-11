"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var ERC20 = require("../ABI/ERC20Mintable");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance,
    getProvider = _require.getProvider;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddress = _require2.isAddress,
    isNumber = _require2.isNumber,
    isFunction = _require2.isFunction;

var signedTX = require("../helpers/signedTX");

var utils = require("../utils");
/**
 * @module ERC20
 * @typicalname SDK.asset
 */

/**
 * returns asset balance by assetAddress or ETH balance
 * @param {address} wallet
 * @param {Address=} assetAddress
 * @returns {balance}
 */


exports.getBalance =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(wallet, assetAddress, isString) {
    var instance, balance, web3;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isAddress({
              wallet: wallet
            });

            if (assetAddress) {
              isAddress({
                assetAddress: assetAddress
              });
            }

            if (!assetAddress) {
              _context.next = 12;
              break;
            }

            instance = createInstance(ERC20.abi, assetAddress);
            _context.t0 = errorHandler;
            _context.next = 7;
            return instance.methods.balanceOf(wallet).call();

          case 7:
            _context.t1 = _context.sent;
            _context.next = 10;
            return (0, _context.t0)(_context.t1);

          case 10:
            balance = _context.sent;
            return _context.abrupt("return", utils.fromWei(balance, isString));

          case 12:
            web3 = getProvider();
            _context.t2 = utils;
            _context.next = 16;
            return errorHandler(web3.eth.getBalance(wallet));

          case 16:
            _context.t3 = _context.sent;
            _context.t4 = isString;
            return _context.abrupt("return", _context.t2.fromWei.call(_context.t2, _context.t3, _context.t4));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * returns asset totalSupply
 * @param {address} assetAddress
 * @return {totalSupply}
 */


exports.totalSupply =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(assetAddress) {
    var instance, total;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isAddress({
              assetAddress: assetAddress
            });
            instance = createInstance(ERC20.abi, assetAddress);
            _context2.next = 4;
            return errorHandler(instance.methods.totalSupply().call());

          case 4:
            total = _context2.sent;
            return _context2.abrupt("return", utils.fromWei(total));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * returns amount approved by owner to spender
 * @param {address} assetAddress
 * @param {address} owner
 * @param {address} spender
 * @return {allowance}
 */


exports.allowance =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(assetAddress, owner, spender) {
    var instance, value;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isAddress({
              assetAddress: assetAddress,
              owner: owner,
              spender: spender
            });
            instance = createInstance(ERC20.abi, assetAddress);
            _context3.t0 = errorHandler;
            _context3.next = 5;
            return instance.methods.allowance(owner, spender).call();

          case 5:
            _context3.t1 = _context3.sent;
            _context3.next = 8;
            return (0, _context3.t0)(_context3.t1);

          case 8:
            value = _context3.sent;
            return _context3.abrupt("return", utils.fromWei(value));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * allows spender to manage a certain amount of assets
 * @param {address} assetAddress asset address
 * @param {address} spender spender wallet address
 * @param {number} value amount of asset
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {from, to, value}
 */


exports.approve =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(assetAddress, spender, value, options, callback) {
    var instance, action, _ref5, blockNumber, Events, _Events$map, _Events$map2, Event;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            isAddress({
              assetAddress: assetAddress,
              spender: spender
            });
            isNumber({
              value: value
            });
            instance = createInstance(ERC20.abi, assetAddress);
            action = instance.methods.approve(spender, utils.toWei(value));
            _context4.next = 6;
            return errorHandler(signedTX({
              data: action,
              from: options.from,
              to: assetAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              callback: callback
            }));

          case 6:
            _ref5 = _context4.sent;
            blockNumber = _ref5.blockNumber;
            _context4.next = 10;
            return errorHandler(instance.getPastEvents("Approval", {
              filter: {
                to: assetAddress,
                from: options.from
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            }));

          case 10:
            Events = _context4.sent;
            _Events$map = Events.map(function (event) {
              var returnValues = event.returnValues;

              var _Object$values = Object.values(returnValues),
                  _Object$values2 = (0, _slicedToArray2.default)(_Object$values, 3),
                  from = _Object$values2[0],
                  to = _Object$values2[1],
                  _value = _Object$values2[2];

              return {
                from: from,
                to: to,
                value: utils.fromWei(_value)
              };
            }), _Events$map2 = (0, _slicedToArray2.default)(_Events$map, 1), Event = _Events$map2[0];
            return _context4.abrupt("return", Event);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x8, _x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * transfer ERC20 asset value to other address
 * @param {address} to wallet address
 * @param {number} value amount of asset
 * @param {address} assetAddress asset address
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {from, to, value}
 */


exports.transfer =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(to, value, assetAddress, options, callback, estimate) {
    var instance, action, _ref7, blockNumber, Events, _Events$map3, _Events$map4, Event;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            isNumber({
              value: value
            });
            isAddress({
              assetAddress: assetAddress,
              to: to,
              from: options.from
            });
            isFunction({
              callback: callback
            });
            instance = createInstance(ERC20.abi, assetAddress);
            action = instance.methods.transfer(to, utils.toWei(value));
            _context5.next = 7;
            return errorHandler(signedTX({
              data: action,
              from: options.from,
              to: assetAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              callback: callback,
              estimate: estimate
            }));

          case 7:
            _ref7 = _context5.sent;
            blockNumber = _ref7.blockNumber;
            _context5.next = 11;
            return errorHandler(instance.getPastEvents("Transfer", {
              filter: {
                to: to,
                from: options.from
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            }));

          case 11:
            Events = _context5.sent;
            _Events$map3 = Events.map(function (event) {
              var returnValues = event.returnValues;

              var _Object$values3 = Object.values(returnValues),
                  _Object$values4 = (0, _slicedToArray2.default)(_Object$values3, 3),
                  from = _Object$values4[0],
                  _to = _Object$values4[1],
                  _value = _Object$values4[2];

              return {
                from: from,
                to: _to,
                value: utils.fromWei(_value)
              };
            }), _Events$map4 = (0, _slicedToArray2.default)(_Events$map3, 1), Event = _Events$map4[0];
            return _context5.abrupt("return", Event);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x13, _x14, _x15, _x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * transfer ETH value to other address
 * @param {address} to wallet address
 * @param {number} value amount of asset
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {from, to, value}
 */


exports.transferETH =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(to, value, options, callback, estimate) {
    var tx;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            isNumber({
              value: value
            });
            isAddress({
              to: to,
              from: options.from
            });
            isFunction({
              callback: callback
            });
            _context6.next = 5;
            return errorHandler(signedTX({
              from: options.from,
              to: to,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              callback: callback,
              value: utils.numberToHex(value),
              estimate: estimate
            }));

          case 5:
            tx = _context6.sent;
            return _context6.abrupt("return", tx);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x19, _x20, _x21, _x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * mint asset value to other wallet from contract owner
 * @param {number} value amount of asset
 * @param {address} to wallet address
 * @param {address} assetAddress asset address
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {from, to, value}
 */


exports.mint =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(value, to, assetAddress, options, callback) {
    var instance, action, _ref10, blockNumber, Events, _Events$map5, _Events$map6, Event;

    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            isNumber({
              value: value
            });
            isAddress({
              assetAddress: assetAddress,
              to: to
            });
            instance = createInstance(ERC20.abi, assetAddress);
            action = instance.methods.mint(to, utils.toWei(value));
            _context7.next = 6;
            return errorHandler(signedTX({
              data: action,
              from: options.from,
              to: assetAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              callback: callback
            }));

          case 6:
            _ref10 = _context7.sent;
            blockNumber = _ref10.blockNumber;
            _context7.next = 10;
            return errorHandler(instance.getPastEvents("Transfer", {
              filter: {
                to: to,
                from: utils.ZERO_ADDRESS
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            }));

          case 10:
            Events = _context7.sent;
            _Events$map5 = Events.map(function (event) {
              var returnValues = event.returnValues;

              var _Object$values5 = Object.values(returnValues),
                  _Object$values6 = (0, _slicedToArray2.default)(_Object$values5, 3),
                  from = _Object$values6[0],
                  _to = _Object$values6[1],
                  _value = _Object$values6[2];

              return {
                from: from,
                to: _to,
                value: utils.fromWei(_value)
              };
            }), _Events$map6 = (0, _slicedToArray2.default)(_Events$map5, 1), Event = _Events$map6[0];
            return _context7.abrupt("return", Event);

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x24, _x25, _x26, _x27, _x28) {
    return _ref9.apply(this, arguments);
  };
}();