const { expect } = require("chai");

const SDK = require("../core");

describe("EntryPoint", () => {
  describe("getProxyAddress", () => {
    it("return PROXY address", async () => {
      const address = await SDK.getProxyAddress();
      expect(address).to.equal(require("../contracts").Proxy);
    });
  });
});
