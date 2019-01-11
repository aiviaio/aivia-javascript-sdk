"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Projects = require("../ABI/ProjectsRegistry");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler;

var Proxy = require("./Proxy");

var getProjectsList =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var registryAddress, instance, length, TMP, projectsList;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Proxy.getRegistryAddress("projects");

          case 2:
            registryAddress = _context2.sent;
            instance = createInstance(Projects.abi, registryAddress);
            _context2.t0 = Number;
            _context2.next = 7;
            return errorHandler(instance.methods.getProjectLength().call());

          case 7:
            _context2.t1 = _context2.sent;
            length = (0, _context2.t0)(_context2.t1);
            TMP = new Array(length).fill();
            _context2.next = 12;
            return TMP.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(value, index) {
                var project, _Object$values, _Object$values2, config, owner, type;

                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return instance.methods.getProjectByID(index + 1).call();

                      case 2:
                        project = _context.sent;
                        _Object$values = Object.values(project), _Object$values2 = (0, _slicedToArray2.default)(_Object$values, 3), config = _Object$values2[0], owner = _Object$values2[1], type = _Object$values2[2];
                        return _context.abrupt("return", {
                          config: config,
                          owner: owner,
                          type: Number(type)
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 12:
            projectsList = _context2.sent;
            return _context2.abrupt("return", Promise.all(projectsList));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getProjectsList() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  getProjectsList: getProjectsList
};