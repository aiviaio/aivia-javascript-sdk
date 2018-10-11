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
      const { name, type, expirationDate } = auditorDetails;
      expect(name).to.equal("John Doe");
      expect(type).to.equal(1);
      expect(expirationDate).to.equal(0);
    });
  });

  describe("getUsersList", () => {
    it("return users list", async () => {
      const result = await SDK.getUsersList();
      expect(result[0]).to.equal(await getAccounts("user"));
      expect(result.length).to.equal(1);
    });
  });

  describe("getAuditorsList", () => {
    it("return auditor list", async () => {
      const result = await SDK.getAuditorsList();
      expect(result[0]).to.equal(await getAccounts("auditor"));
      expect(result.length).to.equal(1);
    });
  });

  describe("getUserDetails", () => {
    it("return users details", async () => {
      const userAddress = await getAccounts("user");
      const result = await SDK.getUserDetails(userAddress);
      const { country, walletType, expirationDate } = result;
      expect(country).to.equal(56);
      expect(walletType).to.equal(1);
      expect(expirationDate).to.equal(1539250541);
    });
  });

  describe("isAuditor", () => {
    it("return false", async () => {
      const userAddress = await getAccounts("user");
      expect(await SDK.isAuditor(userAddress)).to.equal(false);
    });
    it("return true", async () => {
      const auditorAddress = await getAccounts("auditor");
      expect(await SDK.isAuditor(auditorAddress)).to.equal(true);
    });
  });
  describe("custodian", () => {
    let custodianAddress;
    describe("getCustodiansList", () => {
      it("return custodian list", async () => {
        const result = await SDK.getCustodiansList();
        expect(result.length).to.equal(1);
        [custodianAddress] = result;
      });
    });
    describe("getCustodianName", () => {
      it("return custodian name", async () => {
        const name = await SDK.getCustodianName(custodianAddress);
        expect(name).to.equal("Jane Doe");
      });
    });
  });
});
