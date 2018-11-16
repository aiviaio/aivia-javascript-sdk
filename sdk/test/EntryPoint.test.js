const { expect } = require("chai");
const AIVIA_SDK = require("../src");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("EntryPoint", () => {
  describe("getProxyAddress", () => {
    it("return PROXY address", async () => {
      const address = await SDK.getProxyAddress();
      expect(address).to.equal(require("../src/ABI/Proxy").address);
    });
  });
});
