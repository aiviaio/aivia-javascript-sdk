const Proxy = require("../ABI/Proxy");

const sendSignedTransaction = require("../helpers/sendSignedTransaction");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const EntryPoint = require("./EntryPoint");
const getReselectData = require("../Projects/getReselectData");

const deployProject = async (type, params, options) => {
  const proxyAddress = await EntryPoint.getProxyAddress();

  this.instance = createInstance(Proxy.abi, proxyAddress, this);

  const reselectedParams = getReselectData.input(type, params);

  const deployAction = this.instance.methods.deployProject(...reselectedParams);
  const deployABI = deployAction.encodeABI();
  const initAction = this.instance.methods.initProject();

  const initABI = initAction.encodeABI();

  await errorHandler(sendSignedTransaction(proxyAddress, options, deployABI));

  const { blockNumber } = await errorHandler(
    sendSignedTransaction(proxyAddress, options, initABI)
  );

  const [{ returnValues }] = await this.instance.getPastEvents("NewProject", {
    filter: { owner: options.from },
    fromBlock: blockNumber,
    toBlock: "latest"
  });

  return getReselectData.output(type, returnValues);
};

module.exports = {
  deployProject
};
