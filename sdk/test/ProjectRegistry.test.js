const web3 = require("web3");
const { expect, assert } = require("chai");
const AIVIA_SDK = require("../src");
const getAccounts = require("./helpers/getAccounts");

const SDK = new AIVIA_SDK();
describe("ProjectRegistry", () => {
  describe("getProjectList", () => {
    it("return project list", async () => {
      this.projectList = await SDK.getProjectList();
      assert(Array.isArray(this.projectList));
      assert(this.projectList.length > 0);
      this.projectAddress = this.projectList[this.projectList.length - 1];
      expect(web3.utils.isAddress(this.projectAddress)).to.equal(true);
    });
  });

  describe("getProjectID", () => {
    it("return project id", async () => {
      this.projectID = await SDK.getProjectID(this.projectAddress);
      expect(this.projectID).to.equal(this.projectList.length);
    });
  });

  describe("getProjectByID", () => {
    it("return project id", async () => {
      const projectInfo = await SDK.getProjectByID(this.projectID);
      const configAddress = await SDK.getConfigAddress(this.projectAddress);
      const tokenAddress = await SDK.getTokenAddress(this.projectAddress);
      const ownerAddress = await getAccounts("projectOwner");
      const [
        projectAddress,
        projectConfig,
        projectToken,
        projectOwner
      ] = Object.values(projectInfo);
      expect(projectConfig).to.equal(configAddress);
      expect(projectToken).to.equal(tokenAddress);
      expect(projectToken).to.equal(tokenAddress);
      expect(projectOwner).to.equal(ownerAddress);
      expect(web3.utils.isAddress(projectAddress)).to.equal(true);
      expect(projectAddress).to.equal(this.projectAddress);
    });
  });
});