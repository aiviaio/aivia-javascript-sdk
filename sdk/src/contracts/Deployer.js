const Proxy = require("../ABI/Proxy");

const signedTX = require("../helpers/signedTX");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const EntryPoint = require("./EntryPoint");
const ReselectData = require("../projects/ReselectData");

const deployProject = async (type, params, options) => {
  const proxyAddress = await EntryPoint.getProxyAddress();

  this.instance = createInstance(Proxy.abi, proxyAddress, this);

  const _params = ReselectData.input(type, params);

  const deployAction = this.instance.methods.deployProject(..._params);
  const deployABI = deployAction.encodeABI();
  const initAction = this.instance.methods.initProject();

  const initABI = initAction.encodeABI();

  await errorHandler(signedTX(proxyAddress, options, deployABI));

  const { blockNumber } = await errorHandler(
    signedTX(proxyAddress, options, initABI)
  );

  const [{ returnValues }] = await this.instance.getPastEvents("NewProject", {
    filter: { owner: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  return ReselectData.output(type, returnValues);
};

module.exports = {
  deployProject
};
