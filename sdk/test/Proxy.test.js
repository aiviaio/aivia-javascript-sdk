const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const utils = require("./helpers/utils");
const { getAddress } = require("./helpers/users");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("Proxy", () => {
  describe("getRegistryAddress", () => {
    it("return registry address", async () => {
      const address = await SDK.getRegistryAddress("projects");
      expect(address).to.equal(require("../src/ABI/ProjectsRegistry").address);
    });
    it("return zero address", async () => {
      const address = await SDK.getRegistryAddress("nonexistent");
      expect(address).to.equal(utils.ZERO_ADDRESS);
    });
  });

  describe("isDeployer", () => {
    it("return true status", async () => {
      const { address } = require("../src/ABI/OpenEndDeployer");
      const status = await SDK.isDeployer(address);
      expect(status).to.equal(true);
    });
    it("return false status", async () => {
      const { address } = require("../src/ABI/Proxy");
      const status = await SDK.isDeployer(address);
      expect(status).to.equal(false);
    });
  });

  describe("isAuditor", () => {
    it("return true status", async () => {
      const status = await SDK.isAuditor(getAddress("auditorAssets"), 1);
      expect(status).to.equal(true);
    });
    it("return false status", async () => {
      const status = await SDK.isAuditor(getAddress("auditorAssets"), 2);
      expect(status).to.equal(false);
    });
  });
});
