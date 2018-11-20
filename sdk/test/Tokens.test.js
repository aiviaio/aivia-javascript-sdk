const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const projectList = require("./projects");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("Tokens", () => {
  describe("getList", () => {
    it("return tokens list", async () => {
      const Tokens = await SDK.token.getList();
      expect(Tokens.length).to.equal(projectList.length);
      Tokens.forEach((token, index) => {
        expect(token.address).to.equal(projectList[index].token);
      });
    });

    it("return token details", async () => {
      const config = await SDK.token.getConfig(projectList[0].token);
      expect(config.token).to.equal(projectList[0].token);
      expect(config.RPC).to.equal(projectList[0].RPC);
      expect(config.auditDB).to.equal(projectList[0].auditDB);
      expect(config.owner).to.equal(projectList[0].owner);
      expect(config.custodian).to.equal(projectList[0].custodian);
    });
  });
});
