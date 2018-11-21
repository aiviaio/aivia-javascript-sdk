const EthereumTx = require("ethereumjs-tx");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");

module.exports = async ({ data, from, to, privateKey, gasPrice, gasLimit }) => {
  const block = await web3.eth.getBlock("latest");
  const nonce = await web3.eth.getTransactionCount(from);
  const privateKeyBuffer = Buffer.from(privateKey, "hex");

  const txParams = {
    nonce,
    data,
    from,
    to,
    gasPrice: gasPrice || 1000000000,
    gasLimit: gasLimit || block.gasLimit
  };

  const rawTx = new EthereumTx(txParams);

  rawTx.sign(privateKeyBuffer);

  const serializedTx = rawTx.serialize();

  const transaction = await errorHandler(
    web3.eth.sendSignedTransaction(`0x${serializedTx.toString("hex")}`)
  );
  return transaction;
};
