const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const getAccounts = require("./helpers/getAccounts");

const SDK = new AIVIA_SDK();

describe("Proxy", () => {
  describe("getContractAddress", () => {
    it("return contract address", async () => {
      const address = await SDK.getContractAddress("settings");
      expect(address).to.equal(require("../src/ABI/SettingsRegistry").address);
    });

    it("return error when name isn't string", async () => {
      expect(await SDK.getContractAddress(666)).to.be.an("error");
    });

    it("return error when version isn't integer", async () => {
      expect(await SDK.getContractAddress("settings", 1.1)).to.be.an("error");
    });

    it("return zero address when version doesn't exist", async () => {
      const address = await SDK.getContractAddress("settings", 2);
      expect(+address).to.equal(0);
    });

    it("return zero address when address with current name doesn't exist", async () => {
      const address = await SDK.getContractAddress("fakeAddress");
      expect(+address).to.equal(0);
    });

    it("return contract address", async () => {
      const address = await SDK.getContractAddress("settings", 1);
      expect(address).to.equal(require("../src/ABI/SettingsRegistry").address);
    });
  });

  describe("getAuditorDetails", () => {
    it("return auditors details", async () => {
      const auditorAddress = await getAccounts("auditor");
      const auditorDetails = await SDK.getAuditorDetails(auditorAddress);
      console.log(auditorAddress, auditorDetails);
    });
  });
});
