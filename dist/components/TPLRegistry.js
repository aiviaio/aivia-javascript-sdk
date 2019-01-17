"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var TPL_REGISTRY_ABI = require("../ABI/TPLRegistry");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddress = _require2.isAddress,
    isInteger = _require2.isInteger;

var Proxy = require("./Proxy");

var utils = require("../utils");

var signedTX = require("../helpers/signedTX");
/**
 * @module TPLRegistry
 * @typicalname SDK.auditor
 */

/**
 * add or update user
 * @param {address} userAddress user wallet address
 * @param {number} countryID county ID
 * @param {number} walletType wallet type ID
 * @param {number} [expirationDate=0] expiration date
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {number} options.gasLimit gas limit
 * @param {number} options.nonce nonce of transaction
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {event} transaction event {eventName, address}
 */


exports.addUser =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(userAddress, countryID, walletType) {
    var expirationDate,
        options,
        callback,
        estimate,
        registryAddress,
        instance,
        action,
        _ref2,
        blockNumber,
        Events,
        _Events$map,
        _Events$map2,
        Event,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expirationDate = _args.length > 3 && _args[3] !== undefined ? _args[3] : 0;
            options = _args.length > 4 ? _args[4] : undefined;
            callback = _args.length > 5 ? _args[5] : undefined;
            estimate = _args.length > 6 ? _args[6] : undefined;
            isAddress({
              userAddress: userAddress
            });
            isInteger({
              countryID: countryID,
              walletType: walletType,
              expirationDate: expirationDate
            });
            _context.next = 8;
            return Proxy.getRegistryAddress("tpl");

          case 8:
            registryAddress = _context.sent;
            instance = createInstance(TPL_REGISTRY_ABI, registryAddress);
            action = instance.methods.addUser(userAddress, countryID, walletType, expirationDate);
            _context.next = 13;
            return errorHandler(signedTX({
              data: action,
              from: options.from,
              to: registryAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              nonce: options.nonce,
              callback: callback,
              estimate: estimate
            }));

          case 13:
            _ref2 = _context.sent;
            blockNumber = _ref2.blockNumber;
            _context.t0 = errorHandler;
            _context.next = 18;
            return instance.getPastEvents("registryEvent", {
              filter: {
                eventName: "Add"
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            });

          case 18:
            _context.t1 = _context.sent;
            Events = (0, _context.t0)(_context.t1);
            _Events$map = Events.map(function (event) {
              var returnValues = event.returnValues;

              var _Object$values = Object.values(returnValues),
                  _Object$values2 = (0, _slicedToArray2.default)(_Object$values, 2),
                  eventName = _Object$values2[0],
                  address = _Object$values2[1];

              return {
                eventName: utils.toUtf8(eventName),
                address: address
              };
            }), _Events$map2 = (0, _slicedToArray2.default)(_Events$map, 1), Event = _Events$map2[0];
            return _context.abrupt("return", Event);

          case 22:
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
 * returns user details by address
 * @param {address} userAddress
 * @returns {object} userDetails
 * @property {address} userDetails.address
 * @property {number} userDetails.country
 * @property {number} userDetails.walletType
 * @property {number} userDetails.expirationDate
 */


exports.getUserDetails =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(userAddress) {
    var registryAddress, instance, userDetails, _Object$values3, _Object$values4, country, walletType, expirationDate;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isAddress({
              userAddress: userAddress
            });
            _context2.next = 3;
            return Proxy.getRegistryAddress("tpl");

          case 3:
            registryAddress = _context2.sent;
            instance = createInstance(TPL_REGISTRY_ABI, registryAddress);
            _context2.next = 7;
            return errorHandler(instance.methods.getUserDetails(userAddress).call());

          case 7:
            userDetails = _context2.sent;
            _Object$values3 = Object.values(userDetails), _Object$values4 = (0, _slicedToArray2.default)(_Object$values3, 3), country = _Object$values4[0], walletType = _Object$values4[1], expirationDate = _Object$values4[2];
            return _context2.abrupt("return", {
              address: userAddress,
              country: Number(country),
              walletType: Number(walletType),
              expirationDate: Number(expirationDate)
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * returns user list list
 * @returns {userList[]}
 * @property {object} userList.user
 * @property {address} user.address
 * @property {number} user.country
 * @property {number} user.walletType
 * @property {number} user.expirationDate
 */


exports.getUsersList =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(short) {
    var registryAddress, instance, addressList, userList;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Proxy.getRegistryAddress("tpl");

          case 2:
            registryAddress = _context4.sent;
            instance = createInstance(TPL_REGISTRY_ABI, registryAddress);
            _context4.next = 6;
            return errorHandler(instance.methods.getUsersList().call());

          case 6:
            addressList = _context4.sent;

            if (!short) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", addressList);

          case 9:
            userList = addressList.map(
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee3(address) {
                var userDetails;
                return _regenerator.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return errorHandler(module.exports.getUserDetails(address));

                      case 2:
                        userDetails = _context3.sent;
                        return _context3.abrupt("return", userDetails);

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              return function (_x6) {
                return _ref5.apply(this, arguments);
              };
            }());
            return _context4.abrupt("return", Promise.all(userList));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x5) {
    return _ref4.apply(this, arguments);
  };
}();