"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var is = require("is_js");

var CustomError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2.default)(CustomError, _Error);

  function CustomError(name, message) {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, CustomError);

    for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CustomError)).call.apply(_getPrototypeOf2, [this].concat(params)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), CustomError);
    } // Custom debugging information


    _this.name = name;
    _this.message = message;
    _this.date = new Date();
    return _this;
  }

  return CustomError;
}((0, _wrapNativeSuper2.default)(Error));

module.exports = function (_ref) {
  var name = _ref.name,
      message = _ref.message,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "error" : _ref$type;

  if (is.not.string(name) && is.not.string(is.not.string(message))) {
    throw new CustomError("SDK error", "Parameters are not correct");
  }

  if (type === "error") {
    throw new CustomError(name, message);
  }

  return {
    type: type,
    name: name,
    message: message
  };
};