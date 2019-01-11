const EthereumTx = require("ethereumjs-tx");
const { getProvider } = require("../helpers/createInstance");
const {
  isFunction,
  isAddress,
  isString,
  isInteger,
  errorHandler
} = require("../helpers/errorHandler");
const config = require("../config");
const getNonce = require("./getNonce");

const additionalGasLimit = {
  trade: 10000,
  deploy: 120000
};

module.exports = async params => {
  isFunction({ callback: params.callback });
  isAddress({ from: params.from, to: params.to });

  const isEstimateGas =
    typeof params.callback === "function" && params.estimate;

  if (!isEstimateGas) {
    isString({ privateKey: params.privateKey });
  }
  if (params.nonce) {
    isInteger({ nonce: params.nonce });
  }
  const web3 = getProvider();
  const TMP = {};
  if (params.privateKey) {
    TMP.privateKey = Buffer.from(params.privateKey, "hex");
    delete params.privateKey;
  }

  const txParams = {
    nonce: params.nonce || (await errorHandler(getNonce(params.from))),
    from: params.from,
    to: params.to,
    value: params.value,
    gasPrice: params.gasPrice || config.get("DEFAULT_GAS_PRICE")
  };

  let gasLimit = null;

  if (params.value) {
    gasLimit = await web3.eth.estimateGas(txParams);
  }

  if (params.data) {
    const additional = additionalGasLimit[params.action] || 0;
    try {
      gasLimit =
        (await params.data.estimateGas(params.data, { from: params.from })) +
        additional;
    } catch (error) {
      gasLimit = 375000;
    }
    txParams.data = params.data.encodeABI();
  }

  txParams.gasLimit = params.gasLimit || gasLimit || 8000000;

  // return estimated gas limit
  if (isEstimateGas) {
    params.callback(txParams.gasLimit);
    return txParams.gasLimit;
  }

  Object.freeze(txParams);

  TMP.rawTx = new EthereumTx(txParams);

  TMP.rawTx.sign(TMP.privateKey);
  delete TMP.privateKey;

  TMP.serializedTx = TMP.rawTx.serialize();
  delete TMP.rawTx;

  const transaction = web3.eth.sendSignedTransaction(
    `0x${TMP.serializedTx.toString("hex")}`
  );

  transaction.once("transactionHash", hash => {
    if (typeof params.callback === "function") {
      params.callback(hash);
    }
  });

  delete TMP.serializedTx;

  return transaction;
};
