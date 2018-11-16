// const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const getAccounts = require("./helpers/getAccounts");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("Deploy", () => {
  describe("deploy project", () => {
    it("should deploy project", async () => {
      const projectOwner = await getAccounts("projectOwner");
      const custodianAddress = await getAccounts("custodian");
      await SDK.deployProject(
        1,
        {
          projectName: "Open-End Project",
          tokenDetails: {
            tokenName: "Best World Token",
            tokenSymbol: "BWT",
            maxTokens: 1000000,
            maxInvestors: 10000,
            initialPrice: 0.1
          },
          fees: {
            // in percent
            platformFee: 0.2,
            entryFee: 2.2,
            exitFee: 1.2
          },
          custodian: custodianAddress,
          permissions: {
            countries: [],
            walletTypes: [],
            rule: false
          }
        },
        {
          from: projectOwner,
          gasPrice: 1000000000
        }
      );
    });
  });
});
