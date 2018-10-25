const AuditDB = require("../ABI/AuditDB");
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

  const project = new web3.eth.Contract(AuditDB.abi, auditAddress);
  const lastPrice = await errorHandler(project.methods.getLastPrice().call());
  return lastPrice;
};

module.exports = {
  getLastPrice
};
