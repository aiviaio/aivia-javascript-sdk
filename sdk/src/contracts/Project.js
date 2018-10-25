// const is = require("is_js");
const Project = require("../ABI/Project");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");
const projectAuditDB = require("./ProjectAuditDB");

// get audit DB address
const getAuditDbAddress = async projectAddress => {
  if (!web3.utils.isAddress(projectAddress)) {
    return Error({
      name: "params",
      message: "'projectAddress' field must be a address"
    });
  }

  const project = new web3.eth.Contract(Project.abi, projectAddress);

  const auditAddress = await errorHandler(
    project.methods.getAuditDbAddress().call()
  );
  return auditAddress;
};

const getConfigAddress = async projectAddress => {
  if (!web3.utils.isAddress(projectAddress)) {
    return Error({
      name: "params",
      message: "'projectAddress' field must be a address"
    });
  }

  const project = new web3.eth.Contract(Project.abi, projectAddress);

  const configAddress = await errorHandler(
    project.methods.getConfigAddress().call()
  );
  return configAddress;
};

const getTokenAddress = async projectAddress => {
  if (!web3.utils.isAddress(projectAddress)) {
    return Error({
      name: "params",
      message: "'projectAddress' field must be a address"
    });
  }

  const project = new web3.eth.Contract(Project.abi, projectAddress);

  const tokenAddress = await errorHandler(
    project.methods.getTokenAddress().call()
  );
  return tokenAddress;
};

const getProjectTokenPrice = async projectAddress => {
  if (!web3.utils.isAddress(projectAddress)) {
    return Error({
      name: "params",
      message: "'projectAddress' field must be a address"
    });
  }
  const auditDBAddress = await getAuditDbAddress(projectAddress);
  const lastPrice = await errorHandler(
    projectAuditDB.getLastPrice(auditDBAddress)
  );
  return Number(web3.utils.fromWei(lastPrice, "ether"));
};

module.exports = {
  getAuditDbAddress,
  getConfigAddress,
  getTokenAddress,
  getProjectTokenPrice
};
