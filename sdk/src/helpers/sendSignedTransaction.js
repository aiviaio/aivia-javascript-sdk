const EthereumTx = require("ethereumjs-tx");
const web3 = require("../core");

module.exports = async (to, { from, privateKey, gasPrice }, ABI, gasLimit) => {
  const privateKeyBuffer = Buffer.from(privateKey, "hex");
  const nonce = await web3.eth.getTransactionCount(from);
  const txParams = {
    nonce,
    from,
    gasLimit: gasLimit || 6721975,
    gasPrice: gasPrice || 1000000000,
    to,
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
