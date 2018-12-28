const { expect } = require("chai");
const projectList = require("../projects");

const SDK = require("../core");

describe("Projects", () => {
  describe("getList", () => {
    it("return projects list", async () => {
      const Projects = await SDK.project.getList();
      expect(Projects.length).to.equal(projectList.length);
      Projects.forEach((project, index) => {
        expect(project.config).to.equal(projectList[index].config);
        expect(project.owner).to.equal(projectList[index].owner);
      });
    });

    it("return token details", async () => {
      const config = await SDK.project.getConfig(projectList[0].config);
      expect(config.token).to.equal(projectList[0].token);
      expect(config.RPC).to.equal(projectList[0].RPC);
      expect(config.auditDB).to.equal(projectList[0].auditDB);
      expect(config.owner).to.equal(projectList[0].owner);
      expect(config.custodian).to.equal(projectList[0].custodian);
    });
  });
});
