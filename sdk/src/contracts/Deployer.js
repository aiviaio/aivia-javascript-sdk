const EthereumTx = require("ethereumjs-tx");
const Proxy = require("../ABI/Proxy");
const web3 = require("../core");
// const utils = require("../utils");
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

  const sendSignedTransaction = async (
    { from, privateKey, gasPrice },
    ABI,
    gasLimit
  ) => {
    const privateKeyBuffer = Buffer.from(privateKey, "hex");
    const nonce = await web3.eth.getTransactionCount(from);
    const txParams = {
      nonce,
      from,
      gasLimit: gasLimit || 6721975,
      gasPrice: gasPrice || 1000000000,
      to: proxyAddress,
      data: ABI
    };

    const tx = new EthereumTx(txParams);
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();

    const result = await web3.eth.sendSignedTransaction(
      `0x${serializedTx.toString("hex")}`
    );
    return result;
  };

  await errorHandler(sendSignedTransaction(options, deployABI));

  const tx = await errorHandler(sendSignedTransaction(options, initABI));

  const [{ returnValues }] = await this.instance.getPastEvents("NewProject", {
    filter: { owner: options.from },
    fromBlock: tx.blockNumber,
    toBlock: "latest"
  });

  return getReselectData.output(type, returnValues);
};

module.exports = {
  deployProject
};
