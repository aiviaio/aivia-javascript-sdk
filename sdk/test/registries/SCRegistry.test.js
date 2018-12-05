const { expect } = require("chai");
const AIVIA_SDK = require("../../src");

const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");
describe("SCRegistry", () => {
  describe("getCryptoCurrenciesList", () => {
    it("return assets list", async () => {
      this.currencies = await SDK.platform.currency.getList();
      expect(this.currencies.length).to.equal(2);
      expect(this.currencies[0].symbol).to.equal("AIV");
      expect(this.currencies[1].symbol).to.equal("TUSD");
      expect(this.currencies[0].address).to.equal(require("../../src/ABI/PlatformToken").address);
      expect(this.currencies[1].address).to.equal(require("../../src/ABI/TrueUSD").address);
    });

    it("return asset rate", async () => {
      const rateByAddress = await SDK.platform.currency.getRate(this.currencies[0].address);
      const rateBySymbol = await SDK.platform.currency.getRate(this.currencies[1].symbol);
      expect(rateByAddress).to.equal(this.currencies[0].rate);
      expect(rateBySymbol).to.equal(this.currencies[1].rate);
    });
  });
});
