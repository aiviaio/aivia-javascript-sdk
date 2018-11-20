const { expect } = require("chai");
const AIVIA_SDK = require("../src");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");
describe("Assets", () => {
  describe("getAssetsList", () => {
    it("return assets list", async () => {
      this.assetsList = await SDK.platform.getAssetsList();
      expect(this.assetsList.length).to.equal(2);
      expect(this.assetsList[0].symbol).to.equal("AIV");
      expect(this.assetsList[1].symbol).to.equal("TUSD");
      expect(this.assetsList[0].address).to.equal(
        require("../src/ABI/PlatformToken").address
      );
      expect(this.assetsList[1].address).to.equal(
        require("../src/ABI/TrueUSD").address
      );
    });

    it("return asset rate", async () => {
      const rateByAddress = await SDK.platform.getAssetRate(
        this.assetsList[0].address
      );
      const rateBySymbol = await SDK.platform.getAssetRate(
        this.assetsList[1].symbol
      );
      expect(rateByAddress).to.equal(this.assetsList[0].rate);
      expect(rateBySymbol).to.equal(this.assetsList[1].rate);
    });
  });
});
