const PROXY_ABI = require("../ABI/Proxy");
const AssetsRegistry = require("./AssetsRegistry");
const ERC20 = require("./ERC20");
const config = require("../config");
const utils = require("../utils");
const signedTX = require("../helpers/signedTX");
const { createInstance } = require("../helpers/createInstance");
const {
  errorHandler,
  isObject,
  isInteger,
  isZeroAddress
} = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const EntryPoint = require("./EntryPoint");
const ReselectData = require("../projects/ReselectData");

/**
 * @module Deploy
 * @typicalname SDK.project
 */

/**
 * deploy project
 * @param {number} type project type ID
 * @param {object} params
 * @param {string} params.projectName maximum length 32 characters
 * @param {object} params.tokenDetails  {tokenName, tokenSymbol, initialPrice, maxTokens, maxInvestors}
 *
 * @param {string} params.tokenDetails.tokenName maximum length 32 characters
 * @param {string} params.tokenDetails.tokenSymbol maximum length 32 characters
 * @param {number} params.tokenDetails.initialPrice
 * @param {number} params.tokenDetails.maxTokens
 * @param {number} params.tokenDetails.maxInvestors maximum number of investors, if equal to "0" then there are no restrictions
 *
 * @param {object} params.fees {platformFee, entryFee, exitFee}
 * @param {number} params.fees.platformFee indicate in percent
 * @param {number} params.fees.entryFee indicate in percent
 * @param {number} params.fees.exitFee indicate in percent
 * @param {address} params.custodian custodian wallet address
 * @param {object} params.permissions {countries, walletTypes, rule}
 * @param {array.<number>} params.permissions.countries
 * @param {array.<number>} params.permissions.walletTypes
 * @param {boolean} params.permissions.rule
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {components} deployed project components
 */
exports.deploy = async (type, params, options, callback) => {
  isInteger({ type });
  isObject({ params, options });
  const { tokenSymbol } = params.tokenDetails;
  const gasPrice = options.gasPrice || config.get("DEFAULT_GAS_PRICE");
  const approximateCost = utils.fromWei(gasPrice * 8000000);
  const balance = await errorHandler(ERC20.getBalance(options.from));
  const tokenAddress = await errorHandler(
    AssetsRegistry.getAssetAddress(tokenSymbol)
  );
  if (balance < approximateCost) {
    Error({
      name: "transaction",
      message: `For deployment, the balance must be at least ${approximateCost} ETH`
    });
  }
  isZeroAddress({
    tokenAddress: {
      value: tokenAddress,
      message: `${tokenSymbol} already exist`
    }
  });
  const proxyAddress = await errorHandler(EntryPoint.getProxyAddress());
  const instance = createInstance(PROXY_ABI, proxyAddress);
  const _params = ReselectData.input(type, params);
  const deployAction = instance.methods.deployProject(..._params);
  const initAction = instance.methods.initProject();
  await errorHandler(
    signedTX({
      data: deployAction,
      from: options.from,
      to: proxyAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback,
      action: "deploy"
    })
  );

  const { blockNumber } = await errorHandler(
    signedTX({
      data: initAction,
      from: options.from,
      to: proxyAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback,
      action: "deploy"
    })
  );

  const [{ returnValues }] = await instance.getPastEvents("NewProject", {
    filter: { owner: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  return ReselectData.output(type, returnValues);
};
