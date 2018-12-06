const fs = require("fs");
const { expect } = require("chai");
const AIVIA_SDK = require("../../src");
const { getAddress, getUser } = require("../helpers/users");
const projectList = require("../projects");

const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "https://127.0.0.1:8545");

describe("Deploy", () => {
  describe("deploy project", () => {
    it("should deploy project", async () => {
      const projectOwner = await getAddress("projectOwner");
      const custodianAddress = await getAddress("custodian");
      const project = await SDK.project.deploy(
        1,
        {
          projectName: "Open-End Project",
          tokenDetails: {
            tokenName: "Token from SDK",
            tokenSymbol: `SDK${Date.now()}`,
            initialPrice: 0.25,
            maxTokens: 25000000,
            maxInvestors: 3000
          },
          fees: {
            // in %
            platformFee: 0.2,
            entryFee: 2.2,
            exitFee: 3.1
          },
          custodian: custodianAddress,
          permissions: {
            countries: [],
            walletTypes: [],
            rule: false
          }
        },
        getUser("projectOwner")
      );
      expect(project.owner).to.equal(projectOwner);
      projectList.push(project);

      fs.writeFile(
        "./test/projects.json",
        new Uint8Array(Buffer.from(JSON.stringify(projectList, null, 2))),
        error => {
          if (error) throw error;
        }
      );
    });
  });
});
