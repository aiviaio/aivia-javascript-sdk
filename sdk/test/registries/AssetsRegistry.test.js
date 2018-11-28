const { expect } = require("chai");
const AIVIA_SDK = require("../../src");
const projectList = require("../projects");

const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("AssetsRegistry", () => {
  describe("getList", () => {
    it("return tokens list", async () => {
      const Assets = await SDK.asset.getList();
      expect(Assets.length).to.equal(projectList.length);
      Assets.forEach((token, index) => {
        expect(token.address).to.equal(projectList[index].token);
      });
    });

    it("return token details", async () => {
      const config = await SDK.asset.getConfig(projectList[0].token);
      expect(config.token).to.equal(projectList[0].token);
      expect(config.RPC).to.equal(projectList[0].RPC);
      expect(config.auditDB).to.equal(projectList[0].auditDB);
      expect(config.owner).to.equal(projectList[0].owner);
      expect(config.custodian).to.equal(projectList[0].custodian);
    });

    it("return token address", async () => {
      const config = await SDK.asset.getConfig(projectList[0].token);
      const address = await SDK.asset.getAssetAddress(config.tokenSymbol);
      expect(address).to.equal(projectList[0].token);
    });

    it("return token symbol", async () => {
      const config = await SDK.asset.getConfig(projectList[0].token);
      const symbol = await SDK.asset.getAssetSymbol(projectList[0].token);
      expect(symbol).to.equal(config.tokenSymbol);
    });

    it("return ratings list", async () => {
      await SDK.asset.getRatingsList();
    });
  });
});
