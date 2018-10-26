const web3 = require("web3");
const { expect, assert } = require("chai");
const AIVIA_SDK = require("../src");
const getAccounts = require("./helpers/getAccounts");

const SDK = new AIVIA_SDK();
describe("ProjectRegistry", () => {
  describe("project.getList", () => {
    it("return project list", async () => {
      this.projectList = await SDK.project.getList();
      assert(Array.isArray(this.projectList));
      assert(this.projectList.length > 0);
      this.projectAddress = this.projectList[this.projectList.length - 1];
      expect(web3.utils.isAddress(this.projectAddress)).to.equal(true);
    });
  });

  describe("project.getID", () => {
    it("return project id", async () => {
      this.projectID = await SDK.project.getID(this.projectAddress);
      expect(this.projectID).to.equal(this.projectList.length);
    });
  });

  describe("project.getAddressByID", () => {
    it("return project id", async () => {
      const projectInfo = await SDK.project.getAddressByID(this.projectID);
      const configAddress = await SDK.project.getConfigAddress(
        this.projectAddress
      );
      const tokenAddress = await SDK.project.getTokenAddress(
        this.projectAddress
      );
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
