const EthereumTx = require("ethereumjs-tx");
const errorHandler = require("../helpers/errorHandler");
const { getProvider } = require("../helpers/createInstance");

module.exports = async params => {
  const { data, from, to, privateKey, gasPrice, gasLimit } = params;
  const web3 = getProvider();
  const block = await web3.eth.getBlock("latest");
  const nonce = await web3.eth.getTransactionCount(from);
  const TMP = {};
  TMP.privateKey = Buffer.from(privateKey, "hex");

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

  TMP.rawTx = new EthereumTx(txParams);

  TMP.rawTx.sign(TMP.privateKey);
  delete TMP.privateKey;

  TMP.serializedTx = TMP.rawTx.serialize();
  delete TMP.rawTx;

  const transaction = await errorHandler(
    web3.eth.sendSignedTransaction(`0x${TMP.serializedTx.toString("hex")}`)
  );

  delete TMP.serializedTx;

  return transaction;
};
