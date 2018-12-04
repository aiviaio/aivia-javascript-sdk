const is = require("is_js");
const utils = require("../utils");

const input = ({
  projectName,
  tokenDetails: { tokenName, tokenSymbol, initialPrice, maxTokens, maxInvestors },
  fees: { platformFee, entryFee, exitFee },
  custodian,
  permissions: { countries = [], walletTypes = [], rule = false }
}) => {
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

  const fees = {
    platformFee,
    entryFee,
    exitFee
  };

  const namesArray = Object.keys(names).map(name => {
    const element = names[name];
    if (is.not.string(element)) {
      return Error({
        name: "params",
        message: `'${name}' field must be a string`
      });
    }
    return utils.toHex(element);
  });

  const paramsArray = Object.keys(params).map(name => {
    const element = params[name];
    if (is.not.number(element)) {
      return Error({
        name: "params",
        message: `'${name}' field must be a number`
      });
    }
    if (name === "initialPrice") {
      return utils.toWei(element);
    }

    return element;
  });

  const feesArray = Object.keys(fees).map(name => {
    const element = fees[name];
    if (is.not.number(element)) {
      return Error({
        name: "params",
        message: `'${name}' field must be a number`
      });
    }
    return utils.toWei(element);
  });

  if (!utils.isAddress(custodian)) {
    return Error({
      name: "params",
      message: "'custodianAddress' field must be a address"
    });
  }
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
