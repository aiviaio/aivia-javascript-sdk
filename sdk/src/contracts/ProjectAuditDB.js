const AuditDB = require("../ABI/ProjectAudit");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");

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

module.exports = {
  getLastPrice,
  getRatingsList,
  getLastAudit
};
