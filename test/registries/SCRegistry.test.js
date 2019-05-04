const { expect } = require("chai");

const SDK = require("../core");

describe("SCRegistry", () => {
  describe("getCryptoCurrenciesList", () => {
    it("return assets list", async () => {
      this.currencies = await SDK.platform.currency.getList();
      expect(this.currencies.length).to.equal(2);
      expect(this.currencies[0].symbol).to.equal("AIV");
      expect(this.currencies[1].symbol).to.equal("TUSD");
      expect(this.currencies[0].address).to.equal(require("../contracts").AIV);
      expect(this.currencies[1].address).to.equal(
        require("../contracts").TrueUSD
      );
    });

    it("return asset rate", async () => {
      const rateByAddress = await SDK.platform.currency.getRate(
        this.currencies[0].address
      );
      const rateBySymbol = await SDK.platform.currency.getRate(
        this.currencies[1].symbol
      );
      expect(rateByAddress).to.equal(this.currencies[0].rate);
      expect(rateBySymbol).to.equal(this.currencies[1].rate);
    });
  });
});
