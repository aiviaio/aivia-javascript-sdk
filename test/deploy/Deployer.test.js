const fs = require("fs");
const { expect } = require("chai");
const { getAddress, getUser } = require("../helpers/users");
const projectList = require("../projects");

const SDK = require("../core");

const options = {
  fees: {
    platformFee: 0.2,
    entryFee: 1,
    exitFee: 1
  },
  initialPrice: 0.025,
  maxTokens: 25000000,
  maxInvestors: 3000,
  projectName: "Crypto Hedge Project",
  tokenName: "Token from SDK"
};

describe("Deploy", () => {
  describe("deploy project", () => {
    it("should deploy project", async () => {
      const projectOwner = await getAddress("projectOwner");
      const custodianAddress = await getAddress("custodian");
      const project = await SDK.project.deploy(
        1,
        {
          projectName: options.projectName,
          tokenDetails: {
            tokenName: options.tokenName,
            tokenSymbol: `ST${projectList.length}`,
            initialPrice: options.initialPrice,
            maxTokens: options.maxTokens,
            maxInvestors: options.maxInvestors
          },
          fees: options.fees,
          custodian: custodianAddress,
          permissions: {
            countries: [1],
            walletTypes: [2],
            rule: true
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