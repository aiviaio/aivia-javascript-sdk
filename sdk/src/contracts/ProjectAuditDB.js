const is = require("is_js");
const AuditDB = require("../ABI/ProjectAudit");
const GetAuditDB = require("../ABI/IGetAuditDB");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const options = require("../options");

// get audit DB address
const getAuditDbAddress = async address => {
  if (!web3.utils.isAddress(address)) {
    return Error({
      name: "params",
      message: "'address' field must be a address"
    });
  }

  const project = new web3.eth.Contract(GetAuditDB.abi, address);

  const auditAddress = await errorHandler(
    project.methods.getAuditDbAddress().call()
  );
  return auditAddress;
};

// get audit DB address
const getLastPrice = async address => {
  if (!web3.utils.isAddress(address)) {
    return Error({
      name: "params",
      message: "'address' field must be a address"
    });
  }
  const auditAddress = await getAuditDbAddress(address);
  const auditDB = new web3.eth.Contract(AuditDB.abi, auditAddress);
  const lastPrice = await errorHandler(auditDB.methods.getLastPrice().call());
  return Number(web3.utils.fromWei(lastPrice, "ether"));
};

const getRatingsList = async address => {
  if (!web3.utils.isAddress(address)) {
    return Error({
      name: "params",
      message: "'address' field must be a address"
    });
  }
  const auditAddress = await getAuditDbAddress(address);
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

const getLastAudit = async address => {
  if (!web3.utils.isAddress(address)) {
    return Error({
      name: "params",
      message: "'address' field must be a address"
    });
  }
  const auditAddress = await getAuditDbAddress(address);
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
  address,
  { rate, timestamp, checksum },
  { from, gasPrice = options.gasPrice }
) => {
  if (!web3.utils.isAddress(address)) {
    return Error({
      name: "params",
      message: "'address' field must be a address"
    });
  }
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
  const auditAddress = await getAuditDbAddress(address);
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
