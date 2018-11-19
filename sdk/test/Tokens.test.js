const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const projectList = require("./projects");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("Tokens", () => {
  describe("getTokensList", () => {
    it("return tokens list", async () => {
      const Tokens = await SDK.getTokensList();
      expect(Tokens.length).to.equal(projectList.length);
      Tokens.forEach((token, index) => {
        expect(token.address).to.equal(projectList[index].token);
      });
    });
  });
});
