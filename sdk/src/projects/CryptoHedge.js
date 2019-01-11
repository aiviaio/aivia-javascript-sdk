const utils = require("../utils");
const Error = require("../helpers/Error");
const {
  isAddress,
  isString,
  isInteger,
  isNumber,
  isBoolean,
  isArray
} = require("../helpers/errorHandler");

const input = ({
  projectName,
  tokenDetails: {
    tokenName,
    tokenSymbol,
    initialPrice,
    maxTokens,
    maxInvestors
  },
  fees: { platformFee, entryFee, exitFee },
  custodian,
  permissions: { countries = [], walletTypes = [], rule = false }
}) => {
  isString({ projectName, tokenName, tokenSymbol });
  isAddress({ custodian });
  isNumber({ initialPrice, platformFee, entryFee, exitFee });
  isInteger({ maxTokens, maxInvestors });
  isBoolean({ rule });
  isArray({ countries, walletTypes });

  if (countries.length !== walletTypes.length) {
    Error({
      name: "params",
      message: `countries length must be equal walletTypes length`
    });
  }

  const fees = {
    platformFee,
    entryFee,
    exitFee
  };

  const names = {
    projectName,
    tokenName,
    tokenSymbol
  };

  const params = {
    initialPrice,
    maxTokens,
    maxInvestors
  };

  const namesArray = Object.keys(names).map(name => {
    const element = names[name];
    if (name === "tokenSymbol") {
      if (element.length > 4 || element.length < 3) {
        Error({
          name: "params",
          message: `'${name}' length should be 3 or 4 long`
        });
      }
    } else if (element.length > 32) {
      Error({
        name: "params",
        message: `'${name}' length must not exceed 32 characters`
      });
    }

    return utils.toHex(element);
  });

  const paramsArray = Object.keys(params).map(name => {
    const element = params[name];
    if (name === "initialPrice") {
      return utils.toWei(element);
    }
    return element;
  });

  const feesArray = Object.keys(fees).map(name => {
    const element = fees[name];
    if (element >= 100) {
      Error({
        name: "params",
        message: `'${name}' can not be more than 100`
      });
    }
    return utils.toWei(element);
  });

  return {
    type: 1,
    namesArray,
    uintArray: [...paramsArray, ...feesArray],
    addressArray: [custodian],
    countriesArray: countries,
    walletTypesArray: walletTypes,
    validationRule: rule
  };
};

const output = event => {
  const { owner, components } = event;
  const keys = ["token", "auditDB", "RPC", "custodian", "config"];
  const project = { owner };
  keys.forEach((key, index) => {
    project[key] = components[index];
  });

  return project;
};

module.exports = { input, output };
