const { expect } = require("chai");
const AIVIA_SDK = require("../../src");
const { getAddress } = require("../helpers/users");
const utils = require("../../src/utils");

const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("ERC20", () => {
  describe("mint", () => {
    it("should return totalSupply", async () => {
      const AIV = await SDK.platform.token();
      const totalSupply = await SDK.asset.totalSupply(AIV);
      expect(totalSupply).that.is.a("number");
    });

    it("should mint AIV to user", async () => {
      const user = await getAddress("user");
      const platformWallet = await getAddress("platformWallet");
      const AIV = await SDK.platform.token();

      const userAIVBalance = utils.toFixed(
        await SDK.asset.getBalance(user, AIV),
        4
      );
      const amount = 250;
      const { from, to, value } = await SDK.dev.mint(amount, user, AIV, {
        from: platformWallet,
        privateKey:
          "e99b8405af796e858fc0f51d22aa5ce3d678a7e652b028e0836c684d475137f5"
      });

      expect(utils.toFixed(await SDK.asset.getBalance(user, AIV), 4)).to.equal(
        userAIVBalance + amount
      );

      expect(from).to.equal(utils.ZERO_ADDRESS);
      expect(to).to.equal(user);
      expect(value).to.equal(amount);
    });
  });
});
