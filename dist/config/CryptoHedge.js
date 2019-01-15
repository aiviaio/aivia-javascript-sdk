"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var utils = require("../utils");

var convertedFields = ["platformFee", "entryFee", "exitFee", "initialPrice"];

var convertUint = function convertUint(array, name, value) {
  if (array.includes(name)) {
    return (0, _defineProperty2.default)({}, name, utils.fromWei(value));
  }

  return (0, _defineProperty2.default)({}, name, Number(value));
};

var getField =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(key, fields, instance) {
    var methods, promises, list;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            methods = {
              bytes: function () {
                var _bytes = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee(name) {
                  var field;
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return instance.methods.getBytes(utils.toHex(name)).call();

                        case 2:
                          field = _context.sent;
                          return _context.abrupt("return", (0, _defineProperty2.default)({}, name, utils.toUtf8(field)));

                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                function bytes(_x4) {
                  return _bytes.apply(this, arguments);
                }

                return bytes;
              }(),
              constBytes: function () {
                var _constBytes = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee2(name) {
                  var field;
                  return _regenerator.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return instance.methods.getConstBytes(utils.toHex(name)).call();

                        case 2:
                          field = _context2.sent;
                          return _context2.abrupt("return", (0, _defineProperty2.default)({}, name, utils.toUtf8(field)));

                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                function constBytes(_x5) {
                  return _constBytes.apply(this, arguments);
                }

                return constBytes;
              }(),
              uint: function () {
                var _uint = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee3(name) {
                  var field;
                  return _regenerator.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return instance.methods.getUint(utils.toHex(name)).call();

                        case 2:
                          field = _context3.sent;
                          return _context3.abrupt("return", convertUint(convertedFields, name, field));

                        case 4:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));

                function uint(_x6) {
                  return _uint.apply(this, arguments);
                }

                return uint;
              }(),
              constUint: function () {
                var _constUint = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee4(name) {
                  var field;
                  return _regenerator.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return instance.methods.getConstUint(utils.toHex(name)).call();

                        case 2:
                          field = _context4.sent;
                          return _context4.abrupt("return", convertUint(convertedFields, name, field));

                        case 4:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, this);
                }));

                function constUint(_x7) {
                  return _constUint.apply(this, arguments);
                }

                return constUint;
              }(),
              address: function () {
                var _address = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee5(name) {
                  var field;
                  return _regenerator.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return instance.methods.getAddress(utils.toHex(name)).call();

                        case 2:
                          field = _context5.sent;
                          return _context5.abrupt("return", (0, _defineProperty2.default)({}, name, field));

                        case 4:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, this);
                }));

                function address(_x8) {
                  return _address.apply(this, arguments);
                }

                return address;
              }(),
              constAddress: function () {
                var _constAddress = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee6(name) {
                  var field;
                  return _regenerator.default.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return instance.methods.getConstAddress(utils.toHex(name)).call();

                        case 2:
                          field = _context6.sent;
                          return _context6.abrupt("return", (0, _defineProperty2.default)({}, name, field));

                        case 4:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6, this);
                }));

                function constAddress(_x9) {
                  return _constAddress.apply(this, arguments);
                }

                return constAddress;
              }()
            };
            promises = fields.map(function (name) {
              return methods[key](name);
            });
            _context7.next = 4;
            return Promise.all(promises);

          case 4:
            list = _context7.sent;
            return _context7.abrupt("return", list);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getField(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getDetails =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(list, instance) {
    var keys, values, promises, fieldArrays, result, i, array, j, element, owner;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            keys = Object.keys(list);
            values = Object.values(list);
            promises = keys.map(
            /*#__PURE__*/
            function () {
              var _ref9 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee8(key, index) {
                var oneTypeList;
                return _regenerator.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return getField(key, values[index], instance);

                      case 2:
                        oneTypeList = _context8.sent;
                        return _context8.abrupt("return", oneTypeList);

                      case 4:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, this);
              }));

              return function (_x12, _x13) {
                return _ref9.apply(this, arguments);
              };
            }());
            _context9.next = 5;
            return Promise.all(promises);

          case 5:
            fieldArrays = _context9.sent;
            result = {};

            for (i = 0; i < fieldArrays.length; i++) {
              array = fieldArrays[i];

              for (j = 0; j < array.length; j++) {
                element = array[j];
                result = (0, _objectSpread2.default)({}, result, element);
              }
            }

            _context9.next = 10;
            return instance.methods.owner().call();

          case 10:
            owner = _context9.sent;
            result = (0, _objectSpread2.default)({}, result, {
              owner: owner
            });
            return _context9.abrupt("return", result);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function getDetails(_x10, _x11) {
    return _ref8.apply(this, arguments);
  };
}();

module.exports =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee10(instance) {
    var list, details;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            list = {
              bytes: ["tokenName", "projectName"],
              constBytes: ["tokenSymbol"],
              uint: ["platformFee", "entryFee", "exitFee", "maxTokens", "maxInvestors"],
              constUint: ["type", "initialPrice"],
              address: ["RPC"],
              constAddress: ["token", "auditDB", "custodian"]
            };
            _context10.next = 3;
            return getDetails(list, instance);

          case 3:
            details = _context10.sent;
            return _context10.abrupt("return", details);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function (_x14) {
    return _ref10.apply(this, arguments);
  };
}();