// const is = require("is_js");
const Project = require("../ABI/Project");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");

// get audit DB address
const getAuditDbAddress = async projectAddress => {
  if (!web3.utils.isAddress(projectAddress)) {
    return Error({
      name: "params",
      message: "'projectAddress' field must be a number"
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
      message: "'projectAddress' field must be a number"
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
      message: "'projectAddress' field must be a number"
    });
  }

  const project = new web3.eth.Contract(Project.abi, projectAddress);

  const tokenAddress = await errorHandler(
    project.methods.getTokenAddress().call()
  );
  return tokenAddress;
};

module.exports = {
  getAuditDbAddress,
  getConfigAddress,
  getTokenAddress
};
