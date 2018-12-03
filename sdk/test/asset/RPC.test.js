const { expect } = require("chai");
const AIVIA_SDK = require("../../src");
const projectList = require("../projects");
const { getAddress } = require("../helpers/users");
const utils = require("../../src/utils");
const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

const options = {
  platformFee: 0.2,
  entryFee: 2.2,
  exitFee: 1.2,
  tokenPrice: 0.25,
  currencyPrice: 0.5
};

const willMint = value => {
  const inUSD = value * options.currencyPrice;
  const feesInUSD = (inUSD * (options.platformFee + options.entryFee)) / 100;
  const remaining = inUSD - feesInUSD;
  const tokens = remaining / options.tokenPrice;
  return tokens;
};

const platformFee = value => {
  const inUSD = value * options.currencyPrice;
  const feesInUSD = (inUSD * options.platformFee) / 100;
  const tokens = feesInUSD / options.currencyPrice;
  return tokens;
};

const entryFee = value => {
  const inUSD = value * options.currencyPrice;
  const feesInUSD = (inUSD * options.entryFee) / 100;
  const tokens = feesInUSD / options.currencyPrice;
  return tokens;
};

describe("RPC", () => {
  describe("buyToken", () => {
    it("should buy token", async () => {
      const AIV = await SDK.platform.token();
      const platformWallet = await SDK.platform.wallet();
      const user = await getAddress("user");

      const { owner, token } = projectList[0];

      const AIV_USER = await SDK.asset.getBalance(user, AIV);
      const AIV_PROJECT_OWNER = await SDK.asset.getBalance(owner, AIV);
      const AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
      const TOKEN_USER = await SDK.asset.getBalance(user, token);

      const amount = 200;

      await SDK.trade.buy(amount, token, AIV, {
        from: user,
        privateKey:
          "4948e1d0b910f1abcf5bf362709d536c466f3aec324d1685a7d6ecdf889c1c3a"
      });

      console.info(await SDK.trade.estimate(amount, token, AIV));

      const investors = await SDK.asset.getInvestors(token);

      const _AIV_USER = await SDK.asset.getBalance(user, AIV);
      const _AIV_PROJECT_OWNER = await SDK.asset.getBalance(owner, AIV);
      const _AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
      const _TOKEN_USER = await SDK.asset.getBalance(user, token);

      expect(investors).to.equal(1);

      expect(utils.toFixed(_AIV_USER, 2)).to.equal(
        utils.toFixed(AIV_USER - amount, 2)
      );

      expect(utils.toFixed(_TOKEN_USER, 2)).to.equal(
        utils.toFixed(TOKEN_USER + willMint(amount), 2)
      );

      expect(utils.toFixed(_AIV_PROJECT_OWNER, 2)).to.equal(
        utils.toFixed(AIV_PROJECT_OWNER + entryFee(amount), 2)
      );

      expect(utils.toFixed(_AIV_PLATFORM, 2)).to.equal(
        utils.toFixed(AIV_PLATFORM + platformFee(amount), 2)
      );
    });

    it("should sell tokens", async () => {
      const { token, custodian } = projectList[0];
      const amount = 200;
      const user = await getAddress("user");
      const trueUSDOwner = getAddress("trueUSDOwner");
      const TUSD = await SDK.platform.currency.getAddress("TUSD");

      const TUSD_USER = await SDK.asset.getBalance(user, TUSD);

      await SDK.dev.mint(100, custodian, TUSD, {
        from: trueUSDOwner,
        privateKey:
          "971d073b9f16ea9ddca457bd0128a98457f076736a97dcf261b8e6ad3fd97dfd"
      });

      const { spend, received } = await SDK.trade.sell(amount, token, {
        from: user,
        privateKey:
          "4948e1d0b910f1abcf5bf362709d536c466f3aec324d1685a7d6ecdf889c1c3a"
      });
      const TUSD_USER_DIFF =
        (await SDK.asset.getBalance(user, TUSD)) - TUSD_USER;
      expect(spend.value).to.equal(amount);
      expect(utils.toFixed(received.value, 4)).to.equal(
        utils.toFixed(TUSD_USER_DIFF, 4)
      );
    });

    it("should buy token TUSD", async () => {
      const user = await getAddress("user");
      const amount = 20;
      const { token } = projectList[0];
      const TUSD = await SDK.platform.currency.getAddress("TUSD");

      await SDK.trade.buy(amount, token, TUSD, {
        from: user,
        privateKey:
          "4948e1d0b910f1abcf5bf362709d536c466f3aec324d1685a7d6ecdf889c1c3a"
      });
    });

    it("should return NET", async () => {
      const { token } = projectList[0];
      const NET = await SDK.asset.NET(token);
      expect(NET).to.not.equal(0);
    });
  });
});
