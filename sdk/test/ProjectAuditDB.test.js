const web3 = require("web3");
const is = require("is_js");
const { expect, assert } = require("chai");
const AIVIA_SDK = require("../src");
const getAccounts = require("./helpers/getAccounts");

const SDK = new AIVIA_SDK();

describe("ProjectAuditDB", () => {
  before("deploy new project", async () => {
    const from = await getAccounts("projectOwner");
    this.project = await SDK.project.deploy(
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

  describe("project.getTokenPrice", () => {
    it("get token price", async () => {
      const price = await SDK.project.getTokenPrice(this.project.address);
      expect(price).to.equal(0.03);
    });
  });

  describe("project.getLastAudit", () => {
    it("get token price", async () => {
      const { rate, timestamp, checksum } = await SDK.project.getLastAudit(
        this.project.address
      );
      expect(rate).to.equal(0.03);
      expect(is.number(timestamp)).to.equal(true);
      assert(timestamp < Date.now());
      expect(checksum).to.equal("");
    });
  });

  describe("project.getTokenRatings", () => {
    it("get token price", async () => {
      const list = await SDK.project.getTokenRatings(this.project.address);
      console.log(list);
    });
  });
});
