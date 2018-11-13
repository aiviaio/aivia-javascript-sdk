const is = require("is_js");
const ProjectsRegistry = require("../ABI/ProjectsRegistry");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");
const Error = require("../helpers/Error");

const projectRegistry = new web3.eth.Contract(
  ProjectsRegistry.abi,
  ProjectsRegistry.address
);

// get project ID by project address
const getProjectID = async projectAddress => {
  if (!web3.utils.isAddress(projectAddress)) {
    return Error({
      name: "params",
      message: "'projectAddress' field must be a address"
    });
  }

  const ID = await errorHandler(
    projectRegistry.methods.getProjectID(projectAddress).call()
  );
  return Number(ID);
};
// get all deployed components
const getProjectByID = async ID => {
  if (is.not.number(ID)) {
    return Error({
      name: "params",
      message: "'ID' field must be a number"
    });
  }
  const ProjectAddress = await errorHandler(
    projectRegistry.methods.getProjectByID(ID).call()
  );
  return ProjectAddress;
};

// get project list
const getProjectsList = async () => {
  const projectList = await errorHandler(
    projectRegistry.methods.getProjectsList().call()
  );
  return projectList;
};

module.exports = {
  getProjectID,
  getProjectByID,
  getProjectsList
};
