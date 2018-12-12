const fs = require("fs");
const { expect } = require("chai");
const AIVIA_SDK = require("../../src");
const { getAddress, getUser } = require("../helpers/users");
const projectList = require("../projects");

const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "https://127.0.0.1:8545");

const options = {
  fees: {
    platformFee: 0.5,
    entryFee: 2.1,
    exitFee: 2.3
  },
  initialPrice: 0.025
};

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
            tokenSymbol: `ST${projectList.length}`,
            initialPrice: options.initialPrice,
            maxTokens: 25000000,
            maxInvestors: 3000
          },
          fees: options.fees,
          custodian: custodianAddress,
          permissions: {
            countries: [1],
            walletTypes: [1],
            rule: undefined
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

module.exports = options;
