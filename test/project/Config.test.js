const { expect } = require("chai");
const { getUser } = require("../helpers/users");
const assertRevert = require("../helpers/assertRevert");
const projectList = require("../projects");
const initialData = require("../deploy/Deployer.test");
const SDK = require("../core");

const newData = {
  fees: {
    platformFee: 0,
    entryFee: 1,
    exitFee: 0.2
  },
  maxTokens: 25 * 10 ** 18,
  maxInvestors: 3,
  projectName: "New Project name",
  tokenName: "New Token name"
};

describe("Project config", () => {
  describe("update field", () => {
    it("should assert revert when try update from other user", async () => {
      const { config } = projectList[0];

      await assertRevert(
        SDK.project.update(
          config,
          "projectName",
          newData.projectName,
          getUser("external")
        )
      );
    });

    it("should return error", async () => {
      const { config } = projectList[0];
      try {
        await SDK.project.update(
          config,
          "undefined",
          "message",
          getUser("projectOwner")
        );
      } catch (error) {
        expect(error).to.be.an("error");
      }
    });

    it("should update bytes fields", async () => {
      const { config } = projectList[0];
      await SDK.project.update(
        config,
        "projectName",
        newData.projectName,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "tokenName",
        newData.tokenName,
        getUser("projectOwner")
      );

      const CONFIG = await SDK.project.getConfig(config);
      const { tokenName, projectName } = CONFIG;

      expect(tokenName).to.eq(newData.tokenName);
      expect(projectName).to.eq(newData.projectName);
    });

    it("should return error  when value > totalSupply", async () => {
      const { config } = projectList[0];
      try {
        await SDK.project.update(
          config,
          "maxTokens",
          0,
          getUser("projectOwner")
        );
      } catch (error) {
        expect(error).to.be.an("error");
      }
    });

    it("should return error  when value > investors", async () => {
      const { config } = projectList[0];
      try {
        await SDK.project.update(
          config,
          "maxInvestors",
          0,
          getUser("projectOwner")
        );
      } catch (error) {
        expect(error).to.be.an("error");
      }
    });

    it("should update uint fields", async () => {
      const { config } = projectList[0];
      await SDK.project.update(
        config,
        "maxTokens",
        newData.maxTokens,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "maxInvestors",
        newData.maxInvestors,
        getUser("projectOwner")
      );

      const CONFIG = await SDK.project.getConfig(config);
      const { maxInvestors, maxTokens } = CONFIG;

      expect(maxInvestors).to.eq(newData.maxInvestors);
      expect(maxTokens).to.eq(newData.maxTokens);
    });

    it("should update fees fields", async () => {
      const { config } = projectList[0];
      await SDK.project.update(
        config,
        "platformFee",
        newData.fees.platformFee,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "entryFee",
        newData.fees.entryFee,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "exitFee",
        newData.fees.exitFee,
        getUser("projectOwner")
      );

      const CONFIG = await SDK.project.getConfig(config);
      const { exitFee, entryFee, platformFee } = CONFIG;

      expect(exitFee).to.eq(newData.fees.exitFee);
      expect(entryFee).to.eq(newData.fees.entryFee);
      expect(platformFee).to.eq(newData.fees.platformFee);
    });

    it("should reset fields to initial data", async () => {
      const { config } = projectList[0];
      await SDK.project.update(
        config,
        "platformFee",
        initialData.fees.platformFee,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "entryFee",
        initialData.fees.entryFee,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "exitFee",
        initialData.fees.exitFee,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "maxTokens",
        initialData.maxTokens,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "maxInvestors",
        initialData.maxInvestors,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "projectName",
        initialData.projectName,
        getUser("projectOwner")
      );

      await SDK.project.update(
        config,
        "tokenName",
        initialData.tokenName,
        getUser("projectOwner")
      );

      const CONFIG = await SDK.project.getConfig(config);
      const {
        exitFee,
        entryFee,
        platformFee,
        maxInvestors,
        maxTokens,
        tokenName,
        projectName
      } = CONFIG;

      expect(exitFee).to.eq(initialData.fees.exitFee);
      expect(entryFee).to.eq(initialData.fees.entryFee);
      expect(platformFee).to.eq(initialData.fees.platformFee);
      expect(maxInvestors).to.eq(initialData.maxInvestors);
      expect(maxTokens).to.eq(initialData.maxTokens);
      expect(tokenName).to.eq(initialData.tokenName);
      expect(projectName).to.eq(initialData.projectName);
    });
  });
});
