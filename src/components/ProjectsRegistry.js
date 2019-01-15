const PROJECT_REGISTRY_ABI = require("../ABI/ProjectsRegistry");
const { createInstance } = require("../helpers/createInstance");
const { errorHandler } = require("../helpers/errorHandler");
const Proxy = require("./Proxy");

const getProjectsList = async () => {
  const registryAddress = await Proxy.getRegistryAddress("projects");
  const instance = createInstance(PROJECT_REGISTRY_ABI, registryAddress);
  const length = Number(
    await errorHandler(instance.methods.getProjectLength().call())
  );
  const TMP = new Array(length).fill();
  const projectsList = await TMP.map(async (value, index) => {
    const project = await instance.methods.getProjectByID(index + 1).call();
    const [config, owner, type] = Object.values(project);
    return { config, owner, type: Number(type) };
  });

  return Promise.all(projectsList);
};

module.exports = {
  getProjectsList
};
