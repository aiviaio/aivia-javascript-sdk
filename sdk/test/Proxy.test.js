const { expect } = require("chai");
const AIVIA_SDK = require("../src");

const SDK = new AIVIA_SDK();

describe("Proxy", () => {
  describe("getContractAddress", () => {
    it("return contract address", async () => {
      const address = await SDK.getContractAddress("settings");
      expect(address).to.equal(require("../src/ABI/SettingsRegistry").address);
    });
  });
});
