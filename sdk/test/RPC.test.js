const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const projectList = require("./projects");
const { getAddress } = require("./helpers/users");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;
const AIV = require("../src/ABI/PlatformToken").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");
const options = {
  // in percent
  platformFee: 0.2,
  entryFee: 2.2,
  exitFee: 1.2,
  tokenPrice: 0.25,
  currencyPrice: 0.5
};

const getTokesAmountWithoutFees = value => {
  const tokens = (value * options.currencyPrice) / options.tokenPrice;
  const fees = (tokens * (options.platformFee + options.entryFee)) / 100;
  const remaining = +(tokens - fees).toFixed(4);
  return remaining;
};

const getPlatformFee = value => {
  const tokens = (value * options.tokenPrice) / options.currencyPrice;
  const fees = (tokens * (options.platformFee + options.entryFee)) / 100;
  console.log(fees);
};

describe("RPC", () => {
  describe("buyToken", () => {
    it("should buy token", async () => {
      const user = await getAddress("user");
      const tokenAddress = projectList[0].token;
      const userAIVBalance = +(await SDK.asset.getBalance(AIV, user)).toFixed(
        4
      );
      const userTokenBalance = +(await SDK.asset.getBalance(
        tokenAddress,
        user
      )).toFixed(4);
      const amount = 200;
      await SDK.asset.buy(amount, tokenAddress, AIV, {
        from: user,
        privateKey:
          "4948e1d0b910f1abcf5bf362709d536c466f3aec324d1685a7d6ecdf889c1c3a"
      });
      getTokesAmountWithoutFees(amount);
      expect(await SDK.asset.getBalance(AIV, user)).to.equal(
        userAIVBalance - amount
      );
      getPlatformFee(amount);
      expect(await SDK.asset.getBalance(tokenAddress, user)).to.equal(
        userTokenBalance + getTokesAmountWithoutFees(amount)
      );
    });
  });
});
