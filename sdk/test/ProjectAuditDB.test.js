const web3 = require("web3");
const is = require("is_js");
const { expect, assert } = require("chai");
const AIVIA_SDK = require("../src");
const getAccounts = require("./helpers/getAccounts");

const SDK = new AIVIA_SDK();

console.log(SDK);

const newRate = {
  rate: 0.04,
  timestamp: Date.now(),
  checksum: "7fc2ee1906165f3db28ba66b043b4e19"
};

const projectCfg = {
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
};

describe("ProjectAuditDB", () => {
  before("deploy new project", async () => {
    const from = await getAccounts("projectOwner");
    this.project = await SDK.project.deploy(projectCfg, {
      from
    });
    const { address, config, token, owner } = this.project;
    assert(web3.utils.isAddress(address));
    assert(web3.utils.isAddress(config));
    assert(web3.utils.isAddress(token));
    assert(web3.utils.isAddress(owner));
    expect(owner).to.equal(from);
  });

  describe("getConfigAddress", () => {
    it("get token price", async () => {
      const auditDBFromProject = await SDK.project.getConfigAddress(
        this.project.address
      );
      const auditDBFromToken = await SDK.project.getConfigAddress(
        this.project.token
      );
      assert(auditDBFromProject === auditDBFromToken);
    });
  });

  describe("Token:getRating", () => {
    it("get token price", async () => {
      const price = await SDK.token.getRating(this.project.address);
      expect(price).to.equal(projectCfg.initialPrice);
    });
  });

  describe("Token:getLastAudit", () => {
    it("get last audit of token", async () => {
      const { rate, timestamp, checksum } = await SDK.token.getLastAudit(
        this.project.address
      );
      expect(rate).to.equal(projectCfg.initialPrice);
      expect(is.number(timestamp)).to.equal(true);
      assert(timestamp < Date.now());
      expect(checksum).to.equal("");
    });
  });

  describe("Auditor:updateRate", () => {
    it("update token price from audit account", async () => {
      const from = await getAccounts("auditor");
      const tx = await SDK.auditor.updateRate(this.project.address, newRate, {
        from
      });
      expect(tx.status).to.equal(true);
      expect(newRate.rate).to.equal(
        Number(
          web3.utils.fromWei(tx.events.updateAudit.returnValues[0], "ether")
        )
      );
    });
  });

  describe("Token:getRatings", () => {
    it("get token ratings array", async () => {
      const [initAudit, firstAudit] = await SDK.token.getRatings(
        this.project.address
      );
      expect(initAudit.rate).to.equal(projectCfg.initialPrice);
      expect(initAudit.checksum).to.equal("");

      expect(firstAudit.rate).to.equal(newRate.rate);
      expect(firstAudit.checksum).to.equal(newRate.checksum);
    });
  });
});
