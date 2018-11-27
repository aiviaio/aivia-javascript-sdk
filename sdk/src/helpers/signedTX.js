const EthereumTx = require("ethereumjs-tx");
const Web3 = require("web3");
const config = require("../config");
const errorHandler = require("../helpers/errorHandler");

module.exports = async params => {
  const { data, from, to, privateKey, gasPrice, gasLimit } = params;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(config.get("HTTP_PROVIDER"))
  );
  const block = await web3.eth.getBlock("latest");
  const nonce = await web3.eth.getTransactionCount(from);
  const tmp = {};
  tmp.privateKey = Buffer.from(privateKey, "hex");
  delete params.privateKey;

  const txParams = {
    nonce,
    data,
    from,
    to,
    gasPrice: gasPrice || 1000000000,
    gasLimit: gasLimit || block.gasLimit
  };

  Object.freeze(txParams);

  const rawTx = new EthereumTx(txParams);

  rawTx.sign(tmp.privateKey);

  delete tmp.privateKey;

  tmp.serializedTx = rawTx.serialize();

  const transaction = await errorHandler(
    web3.eth.sendSignedTransaction(`0x${tmp.serializedTx.toString("hex")}`)
  );

  delete tmp.serializedTx;

  return transaction;
};
