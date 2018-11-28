const Proxy = require("../ABI/Proxy");

const signedTX = require("../helpers/signedTX");
const { createInstance } = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const EntryPoint = require("./EntryPoint");
const ReselectData = require("../projects/ReselectData");

const deployProject = async (type, params, options) => {
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
      gasLimit: options.gasLimit
    })
  );

  const { blockNumber } = await errorHandler(
    signedTX({
      data: initAction.encodeABI(),
      from: options.from,
      to: proxyAddress,
      privateKey: options.privateKey,
      gasPrice: options.gasPrice,
      gasLimit: options.gasLimit
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
