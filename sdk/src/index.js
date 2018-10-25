const EntryPoint = require("./contracts/EntryPoint");
const Proxy = require("./contracts/Proxy");
const ProjectDeployer = require("./contracts/ProjectDeployer");
const ProjectRegistry = require("./contracts/ProjectRegistry");
const Project = require("./contracts/Project");

module.exports = function SDK() {
  // entry point
  this.getProxyAddress = () => EntryPoint.getProxyAddress();

  // Contract Registry
  this.getContractAddress = (name, version) =>
    Proxy.getContractAddress(name, version);

  // TPL Registry
  this.getUserDetails = address => Proxy.getUserDetails(address);
  this.getUsersList = () => Proxy.getUsersList();

  // Auditors Registry
  this.getAuditorDetails = address => Proxy.getAuditorDetails(address);
  this.getAuditorsList = () => Proxy.getAuditorsList();
  this.isAuditor = address => Proxy.isAuditor(address);

  // Custodian
  this.getCustodiansList = () => Proxy.getCustodiansList();
  this.getCustodianName = address => Proxy.getCustodianName(address);

  // Assets Registry
  this.getAssetsList = () => Proxy.getAssetsList();
  this.getAssetRate = address => Proxy.getAssetRate(address);
  this.getAssetAddress = name => Proxy.getAssetAddress(name);

  // project deployer
  this.deployProject = (options, from) =>
    ProjectDeployer.deployProject(options, from);

  // project registry
  this.getProjectID = address => ProjectRegistry.getProjectID(address);
  this.getProjectByID = id => ProjectRegistry.getProjectByID(id);
  this.getProjectList = () => ProjectRegistry.getProjectList();

  // project
  this.getAuditDbAddress = address => Project.getAuditDbAddress(address);
  this.getConfigAddress = address => Project.getConfigAddress(address);
  this.getTokenAddress = address => Project.getTokenAddress(address);
};
