const Proxy = require("../ABI/Proxy");
const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const EntryPoint = require("./EntryPoint");
const getReselectData = require("../Projects/getReselectData");

const deployProject = async (type, params, options) => {
  const proxyAddress = await EntryPoint.getProxyAddress();

  this.instance = createInstance(Proxy.abi, proxyAddress, this);

  const reselectedParams = getReselectData.input(type, params);
  const deployAction = this.instance.methods.deployProject(...reselectedParams);

  const initAction = this.instance.methods.initProject();

  await errorHandler(
    deployAction.send({
      from: options.from,
      gasPrice: options.gasPrice || 1000000000,
      gas: 6721975
    })
  );

  const { events } = await errorHandler(
    initAction.send({
      from: options.from,
      gasPrice: options.gasPrice || 1000000000,
      gas: 6721975
    })
  );

  const initEvent = events.projectInitialization.returnValues;

  return getReselectData.output(type, initEvent);
};

module.exports = {
  deployProject
};
