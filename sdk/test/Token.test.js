const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const projectList = require("./projects");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("Token", () => {
  describe("getAuditDBAddress", () => {
    it("return auditDB address", async () => {
      const { tokenSymbol } = await SDK.token.getConfig(projectList[0].token);
      const auditDBBySymbol = await SDK.token.getAuditDBAddress(tokenSymbol);
      const auditDBByAddress = await SDK.token.getAuditDBAddress(
        projectList[0].token
      );
      expect(auditDBBySymbol).to.equal(projectList[0].auditDB);
      expect(auditDBByAddress).to.equal(projectList[0].auditDB);
    });

    it("return token price", async () => {
      const { initialPrice, tokenSymbol } = await SDK.token.getConfig(
        projectList[projectList.length - 1].token
      );
      const priceBySymbol = await SDK.token.getTokenPrice(tokenSymbol);
      const priceByAddress = await SDK.token.getTokenPrice(
        projectList[projectList.length - 1].token
      );
      expect(priceBySymbol).to.equal(initialPrice);
      expect(priceByAddress).to.equal(initialPrice);
    });

    it("return RPC address", async () => {
      const { RPC, tokenSymbol } = await SDK.token.getConfig(
        projectList[projectList.length - 1].token
      );
      const RPCBySymbol = await SDK.token.getRPCAddress(tokenSymbol);
      const RPCByAddress = await SDK.token.getRPCAddress(
        projectList[projectList.length - 1].token
      );
      expect(RPCBySymbol).to.equal(RPC);
      expect(RPCByAddress).to.equal(RPC);
    });
  });
});
