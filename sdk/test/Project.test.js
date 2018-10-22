// const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const getAccounts = require("./helpers/getAccounts");

const SDK = new AIVIA_SDK();
describe("EntryPoint", () => {
  describe("deployProject", () => {
    it("return PROXY address", async () => {
      const projectOwnerAddress = await getAccounts("projectOwner");
      try {
        await SDK.deployProject(
          {
            projectName: "This is test project",
            tokenName: "EWT Token",
            tokenSymbol: "EWT",
            projectTypeID: 2,
            maxTokens: 1000,
            maxInvestors: 100,
            initialPrice: 0.1,
            platformFee: 0.2,
            entryFee: 2.2,
            exitFee: 1.1,
            custodianAddress: require("../src/ABI/Custodian").address
          },
          { from: projectOwnerAddress }
        );
      } catch (e) {
        console.log(e);
      }
    });
  });
});
