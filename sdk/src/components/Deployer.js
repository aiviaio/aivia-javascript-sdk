const Proxy = require("../ABI/Proxy");
const AssetsRegistry = require("./AssetsRegistry");
const ERC20 = require("./ERC20");
const config = require("../config");
const utils = require("../utils");
const signedTX = require("../helpers/signedTX");
const { createInstance } = require("../helpers/createInstance");
const { errorHandler, isObject, isInteger, isZeroAddress } = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const EntryPoint = require("./EntryPoint");
const ReselectData = require("../projects/ReselectData");

const deployProject = async (type, params, options, callback) => {
  isInteger({ type });
  isObject({ params, options });
  const { tokenSymbol } = params.tokenDetails;
  const gasPrice = options.gasPrice || config.get("DEFAULT_GAS_PRICE");
  const approximateCost = utils.fromWei(gasPrice * 8000000);
  const balance = await ERC20.getBalance(options.from);
  const tokenAddress = await AssetsRegistry.getAssetAddress(tokenSymbol);
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
  const proxyAddress = await EntryPoint.getProxyAddress();
  const instance = createInstance(Proxy.abi, proxyAddress);
  const _params = ReselectData.input(type, params);
  const deployAction = instance.methods.deployProject(..._params);
  const initAction = instance.methods.initProject();
  await errorHandler(
    signedTX({
      data: deployAction.encodeABI(),
      from: options.from,
      to: proxyAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );

  const { blockNumber } = await errorHandler(
    signedTX({
      data: initAction.encodeABI(),
      from: options.from,
      to: proxyAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit,
      callback
    })
  );

  const [{ returnValues }] = await instance.getPastEvents("NewProject", {
    filter: { owner: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  return ReselectData.output(type, returnValues);
};

module.exports = {
  deployProject
};
