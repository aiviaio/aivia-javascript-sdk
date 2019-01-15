const { expect } = require("chai");
const utils = require("../../src/utils");
const { getAddress } = require("../helpers/users");

const SDK = require("../core");

describe("Proxy", () => {
  describe("getRegistryAddress", () => {
    it("return registry address", async () => {
      const address = await SDK.getRegistryAddress("projects");
      expect(address).to.equal(require("../contracts").ProjectsRegistry);
    });
    it("return zero address", async () => {
      const address = await SDK.getRegistryAddress("nonexistent");
      expect(address).to.equal(utils.ZERO_ADDRESS);
    });
  });

  describe("isDeployer", () => {
    it("return false status", async () => {
      const address = require("../contracts").Proxy;
      const status = await SDK.utils.isDeployer(address);
      expect(status).to.equal(false);
    });
  });

  describe("isAuditor", () => {
    it("return true status", async () => {
      const status = await SDK.utils.isAuditor(getAddress("DGAddress"), 1);
      expect(status).to.equal(true);
    });
    it("return false status", async () => {
      const status = await SDK.utils.isAuditor(getAddress("user"), 2);
      expect(status).to.equal(false);
    });
  });
});
