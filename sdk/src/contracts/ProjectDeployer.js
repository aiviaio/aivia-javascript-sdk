const is = require("is_js");
const Proxy = require("../ABI/Proxy");
const PR = require("../ABI/ProjectsRegistry");
const web3 = require("../core");
const options = require("../options");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");

const proxy = new web3.eth.Contract(Proxy.abi, Proxy.address);
const projectRegistry = new web3.eth.Contract(PR.abi, PR.address);

/**
 * deploy project
 */
const deployProject = async (
  {
    projectName,
    tokenName,
    tokenSymbol,
    projectTypeID,
    maxTokens,
    maxInvestors,
    initialPrice,
    platformFee,
    entryFee,
    exitFee,
    custodianAddress
  },
  { from, gasPrice = options.gasPrice }
) => {
  const names = {
    projectName,
    tokenName,
    tokenSymbol
  };

  const params = {
    projectTypeID,
    maxTokens,
    maxInvestors,
    initialPrice
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
    return web3.utils.utf8ToHex(element);
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
      return web3.utils.toWei(element.toString(), "ether");
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
    return web3.utils.toWei(element.toString(), "ether");
  });

  if (!web3.utils.isAddress(custodianAddress)) {
    return Error({
      name: "params",
      message: "'custodianAddress' field must be a address"
    });
  }

  const action = proxy.methods.deployProject(
    namesArray,
    paramsArray,
    feesArray,
    custodianAddress
  );
  const tx = await errorHandler(
    action.send({
      from,
      gasPrice,
      gas: options.gasLimit
    })
  );

  const projectAddress = tx.events[1].address;
  // get project ID by project address
  const projectID = await projectRegistry.methods
    .getProjectID(projectAddress)
    .call();
  // get all deployed components
  const projectComponentsTmp = await projectRegistry.methods
    .getProjectByID(projectID)
    .call();

  const [address, config, token, owner] = Object.values(projectComponentsTmp);
  return { address, config, token, owner };
};

module.exports = {
  deployProject
};
