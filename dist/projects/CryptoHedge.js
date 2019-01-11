"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var utils = require("../utils");

var Error = require("../helpers/Error");

var _require = require("../helpers/errorHandler"),
    isAddress = _require.isAddress,
    isString = _require.isString,
    isInteger = _require.isInteger,
    isNumber = _require.isNumber,
    isBoolean = _require.isBoolean,
    isArray = _require.isArray;

var input = function input(_ref) {
  var projectName = _ref.projectName,
      _ref$tokenDetails = _ref.tokenDetails,
      tokenName = _ref$tokenDetails.tokenName,
      tokenSymbol = _ref$tokenDetails.tokenSymbol,
      initialPrice = _ref$tokenDetails.initialPrice,
      maxTokens = _ref$tokenDetails.maxTokens,
      maxInvestors = _ref$tokenDetails.maxInvestors,
      _ref$fees = _ref.fees,
      platformFee = _ref$fees.platformFee,
      entryFee = _ref$fees.entryFee,
      exitFee = _ref$fees.exitFee,
      custodian = _ref.custodian,
      _ref$permissions = _ref.permissions,
      _ref$permissions$coun = _ref$permissions.countries,
      countries = _ref$permissions$coun === void 0 ? [] : _ref$permissions$coun,
      _ref$permissions$wall = _ref$permissions.walletTypes,
      walletTypes = _ref$permissions$wall === void 0 ? [] : _ref$permissions$wall,
      _ref$permissions$rule = _ref$permissions.rule,
      rule = _ref$permissions$rule === void 0 ? false : _ref$permissions$rule;
  isString({
    projectName: projectName,
    tokenName: tokenName,
    tokenSymbol: tokenSymbol
  });
  isAddress({
    custodian: custodian
  });
  isNumber({
    initialPrice: initialPrice,
    platformFee: platformFee,
    entryFee: entryFee,
    exitFee: exitFee
  });
  isInteger({
    maxTokens: maxTokens,
    maxInvestors: maxInvestors
  });
  isBoolean({
    rule: rule
  });
  isArray({
    countries: countries,
    walletTypes: walletTypes
  });

  if (countries.length !== walletTypes.length) {
    Error({
      name: "params",
      message: "countries length must be equal walletTypes length"
    });
  }

  var fees = {
    platformFee: platformFee,
    entryFee: entryFee,
    exitFee: exitFee
  };
  var names = {
    projectName: projectName,
    tokenName: tokenName,
    tokenSymbol: tokenSymbol
  };
  var params = {
    initialPrice: initialPrice,
    maxTokens: maxTokens,
    maxInvestors: maxInvestors
  };
  var namesArray = Object.keys(names).map(function (name) {
    var element = names[name];

    if (name === "tokenSymbol") {
      if (element.length > 4 || element.length < 3) {
        Error({
          name: "params",
          message: "'".concat(name, "' length should be 3 or 4 long")
        });
      }
    } else if (element.length > 32) {
      Error({
        name: "params",
        message: "'".concat(name, "' length must not exceed 32 characters")
      });
    }

    return utils.toHex(element);
  });
  var paramsArray = Object.keys(params).map(function (name) {
    var element = params[name];

    if (name === "initialPrice") {
      return utils.toWei(element);
    }

    return element;
  });
  var feesArray = Object.keys(fees).map(function (name) {
    var element = fees[name];

    if (element >= 100) {
      Error({
        name: "params",
        message: "'".concat(name, "' can not be more than 100")
      });
    }

    return utils.toWei(element);
  });
  return {
    type: 1,
    namesArray: namesArray,
    uintArray: [].concat((0, _toConsumableArray2.default)(paramsArray), (0, _toConsumableArray2.default)(feesArray)),
    addressArray: [custodian],
    countriesArray: countries,
    walletTypesArray: walletTypes,
    validationRule: rule
  };
};

var output = function output(event) {
  var owner = event.owner,
      components = event.components;
  var keys = ["token", "auditDB", "RPC", "custodian", "config"];
  var project = {
    owner: owner
  };
  keys.forEach(function (key, index) {
    project[key] = components[index];
  });
  return project;
};

module.exports = {
  input: input,
  output: output
};