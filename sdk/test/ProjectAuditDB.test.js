const web3 = require("web3");
const { expect, assert } = require("chai");
const AIVIA_SDK = require("../src");
const getAccounts = require("./helpers/getAccounts");

const SDK = new AIVIA_SDK();

describe("ProjectAuditDB", () => {
  before("deploy new project", async () => {
    const from = await getAccounts("projectOwner");
    this.project = await SDK.deployProject(
      {
        projectName: "Best World Project",
        tokenName: "Best World Token",
        tokenSymbol: "BWT",
        projectTypeID: 1,
        maxTokens: 1000000,
        maxInvestors: 1000,
        initialPrice: 0.03,
        platformFee: 0.5,
        entryFee: 1.2,
        exitFee: 1.3,
        custodianAddress: require("../src/ABI/Custodian").address
      },
      {
        from
      }
    );
    const { address, config, token, owner } = this.project;
    assert(web3.utils.isAddress(address));
    assert(web3.utils.isAddress(config));
    assert(web3.utils.isAddress(token));
    assert(web3.utils.isAddress(owner));
    expect(owner).to.equal(from);
  });

  describe("getProjectTokenPrice", () => {
    it("get token price", async () => {
      const price = await SDK.getProjectTokenPrice(this.project.address);
      expect(price).to.equal(0.03);
    });
  });

  describe("getRatingsList", () => {
    it("get token price", async () => {
      const list = await SDK.getRatingsList(this.project.address);
      console.log(list);
    });
  });
});
