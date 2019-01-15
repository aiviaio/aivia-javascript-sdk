"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var CUSTODIAN_REGISTRY_ABI = require("../ABI/CustodiansRegistry");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isAddress = _require2.isAddress;

var Proxy = require("./Proxy");

var utils = require("../utils");

var getList =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var registryAddress, instance, addressesList, custodiansList;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Proxy.getRegistryAddress("custodians");

          case 2:
            registryAddress = _context2.sent;
            instance = createInstance(CUSTODIAN_REGISTRY_ABI, registryAddress);
            _context2.next = 6;
            return errorHandler(instance.methods.getCustodiansList().call());

          case 6:
            addressesList = _context2.sent;
            custodiansList = addressesList.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(address) {
                var details, _Object$values, _Object$values2, name, contracts;

                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return errorHandler(instance.methods.getCustodianDetails(address).call());

                      case 2:
                        details = _context.sent;
                        _Object$values = Object.values(details), _Object$values2 = (0, _slicedToArray2.default)(_Object$values, 2), name = _Object$values2[0], contracts = _Object$values2[1];
                        return _context.abrupt("return", {
                          address: address,
                          name: utils.toUtf8(name),
                          contracts: contracts
                        });

                      case 5:
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
            return _context2.abrupt("return", Promise.all(custodiansList));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getList() {
    return _ref.apply(this, arguments);
  };
}();

var getDetails =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(custodianAddress) {
    var registryAddress, instance, details, _Object$values3, _Object$values4, name, contracts;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isAddress({
              custodianAddress: custodianAddress
            });
            _context3.next = 3;
            return Proxy.getRegistryAddress("custodians");

          case 3:
            registryAddress = _context3.sent;
            instance = createInstance(CUSTODIAN_REGISTRY_ABI, registryAddress);
            _context3.next = 7;
            return errorHandler(instance.methods.getCustodianDetails(custodianAddress).call());

          case 7:
            details = _context3.sent;
            _Object$values3 = Object.values(details), _Object$values4 = (0, _slicedToArray2.default)(_Object$values3, 2), name = _Object$values4[0], contracts = _Object$values4[1];
            return _context3.abrupt("return", {
              name: utils.toUtf8(name),
              contracts: contracts
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getDetails(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  getList: getList,
  getDetails: getDetails
};