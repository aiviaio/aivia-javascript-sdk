const is = require("is_js");
const AuditDB = require("../ABI/ProjectAudit");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const options = require("../options");

// get audit DB address
const getLastPrice = async auditAddress => {
  if (!web3.utils.isAddress(auditAddress)) {
    return Error({
      name: "params",
      message: "'auditAddress' field must be a address"
    });
  }

  const auditDB = new web3.eth.Contract(AuditDB.abi, auditAddress);
  const lastPrice = await errorHandler(auditDB.methods.getLastPrice().call());
  return lastPrice;
};

const getRatingsList = async auditAddress => {
  if (!web3.utils.isAddress(auditAddress)) {
    return Error({
      name: "params",
      message: "'auditAddress' field must be a address"
    });
  }

  const auditDB = new web3.eth.Contract(AuditDB.abi, auditAddress);
  const count = await errorHandler(auditDB.methods.getCount().call());

  const callStack = [];
  for (let i = 0; i < count; i++) {
    callStack.push(auditDB.methods.getAuditSegment(i + 1).call());
  }

  const promisesArray = await Promise.all(callStack);

  return promisesArray.map(segment => {
    const [rate, timestamp, checksum] = Object.values(segment);
    return {
      rate: Number(web3.utils.fromWei(rate.toString(), "ether")),
      timestamp: Number(timestamp),
      checksum: web3.utils.hexToUtf8(checksum)
    };
  });
};

const getLastAudit = async auditAddress => {
  if (!web3.utils.isAddress(auditAddress)) {
    return Error({
      name: "params",
      message: "'auditAddress' field must be a address"
    });
  }

  const auditDB = new web3.eth.Contract(AuditDB.abi, auditAddress);
  const lastAudit = await errorHandler(auditDB.methods.getLastAudit().call());
  const [rate, timestamp, checksum] = Object.values(lastAudit);
  return {
    rate: Number(web3.utils.fromWei(rate.toString(), "ether")),
    timestamp: Number(timestamp),
    checksum: web3.utils.hexToUtf8(checksum)
  };
};

const updateRate = async (
  auditAddress,
  { rate, timestamp, checksum },
  { from, gasPrice = options.gasPrice }
) => {
  if (is.not.number(rate)) {
    return Error({
      name: "params",
      message: "'rate' field must be a number"
    });
  }
  if (is.not.number(timestamp)) {
    return Error({
      name: "params",
      message: "'rate' field must be a number"
    });
  }
  if (is.not.string(checksum)) {
    return Error({
      name: "params",
      message: "'checksum' field must be a string"
    });
  }
  const auditDB = new web3.eth.Contract(AuditDB.abi, auditAddress);
  const action = auditDB.methods.updateRate(
    web3.utils.toWei(rate.toString(), "ether"),
    timestamp,
    web3.utils.utf8ToHex(checksum)
  );

  const gas = await action.estimateGas({ from });

  const tx = await errorHandler(
    action.send({
      from,
      gasPrice,
      gas
    })
  );

  return tx;
};

module.exports = {
  getLastPrice,
  getRatingsList,
  getLastAudit,
  updateRate
};
