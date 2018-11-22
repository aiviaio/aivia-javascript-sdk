const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const projectList = require("./projects");
const { getAddress } = require("./helpers/users");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;

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
  const inUSD = value * options.currencyPrice;
  const feesInUSD = (inUSD * (options.platformFee + options.entryFee)) / 100;
  const remaining = inUSD - feesInUSD;
  const tokens = +(remaining / options.tokenPrice);
  return tokens;
};

const getPlatformFee = value => {
  const inUSD = value * options.currencyPrice;
  const feesInUSD = (inUSD * options.platformFee) / 100;
  const tokens = +(feesInUSD / options.currencyPrice);
  return tokens;
};

const getEntryFee = value => {
  const inUSD = value * options.currencyPrice;
  const feesInUSD = (inUSD * options.entryFee) / 100;
  const tokens = +(feesInUSD / options.currencyPrice);
  return tokens;
};

describe("RPC", () => {
  describe("buyToken", () => {
    it("should buy token", async () => {
      const AIV = await SDK.platform.token();
      const platformWallet = await SDK.platform.wallet();
      const user = await getAddress("user");
      const { owner, token } = projectList[0];
      const userAIVBalance = await SDK.asset.getBalance(AIV, user);
      const ownerBalance = await SDK.asset.getBalance(AIV, owner);
      const userTokenBalance = await SDK.asset.getBalance(token, user);
      const platformBalance = await SDK.asset.getBalance(AIV, platformWallet);
      console.log(platformBalance);
      const amount = 200;
      await SDK.asset.buy(amount, token, AIV, {
        from: user,
        privateKey:
          "4948e1d0b910f1abcf5bf362709d536c466f3aec324d1685a7d6ecdf889c1c3a"
      });
      expect(await SDK.asset.getBalance(AIV, user)).to.equal(
        userAIVBalance - amount
      );

      expect(await SDK.asset.getBalance(token, user)).to.equal(
        userTokenBalance + getTokesAmountWithoutFees(amount)
      );

      expect(await SDK.asset.getBalance(AIV, owner)).to.equal(
        ownerBalance + getEntryFee(amount)
      );
    });
  });
});
