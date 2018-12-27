const { expect, assert } = require("chai");
const fs = require("fs");
const options = require("../deploy/Deployer.test");
const AIVIA_SDK = require("../../src");
const projectList = require("../projects");
const { getAddress, getUser } = require("../helpers/users");
const utils = require("../../src/utils");
const assertRevert = require("../helpers/assertRevert");
const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;
const history = require("../history");

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

const amount = {
  AIV: 200,
  TOKEN: 200,
  TUSD: 10,
  PL: 0
};

const events = {
  buy: true,
  sell: true
};

const willMint = (value, rate, currencyPrice) => {
  const inUSD = value * currencyPrice;
  const feesInUSD = (inUSD * (options.fees.platformFee + options.fees.entryFee)) / 100;
  const remaining = inUSD - feesInUSD;
  const tokens = remaining / rate;
  return tokens;
};

const platformFee = (value, currencyPrice) => {
  const inUSD = value * currencyPrice;
  const feesInUSD = (inUSD * options.fees.platformFee) / 100;
  const tokens = feesInUSD / currencyPrice;
  return tokens;
};

const entryFee = (value, currencyPrice) => {
  const inUSD = value * currencyPrice;
  const feesInUSD = (inUSD * options.fees.entryFee) / 100;
  const tokens = feesInUSD / currencyPrice;
  return tokens;
};

describe("RPC", async () => {
  it("should buy token", async () => {
    if (!events.buy) return;
    const AIV = await SDK.platform.token();
    const platformWallet = await SDK.platform.wallet();
    const user = await getAddress("user");
    const TUSD = await SDK.platform.currency.getAddress("TUSD");
    await SDK.asset.mint(200, user, TUSD, getUser("trueUSDOwner"));
    const { owner, token } = projectList[projectList.length - 1];
    const AIV_USER = await SDK.asset.getBalance(user, AIV);
    const AIV_PROJECT_OWNER = await SDK.asset.getBalance(owner, AIV);
    const AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
    const TOKEN_USER = await SDK.asset.getBalance(user, token);
    const rate = await SDK.asset.getRate(token);
    const AIV_RATE = await SDK.platform.currency.getRate(AIV);
    function estimateGasLimit(value) {
      assert(value < 0);
    }
    await SDK.trade.buy(amount.AIV, token, AIV, getUser("user"), estimateGasLimit);
    await SDK.trade.buy(amount.AIV, token, AIV, getUser("user"));
    const investors = await SDK.asset.getInvestors(token);

    const _AIV_USER = await SDK.asset.getBalance(user, AIV);
    const _AIV_PROJECT_OWNER = await SDK.asset.getBalance(owner, AIV);
    const _AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
    const _TOKEN_USER = await SDK.asset.getBalance(user, token);

    expect(investors).to.equal(1);

    expect(utils.toFixed(_AIV_USER, 2)).to.equal(utils.toFixed(AIV_USER - amount.AIV, 2));

    expect(utils.toFixed(_TOKEN_USER, 2)).to.equal(
      utils.toFixed(TOKEN_USER + willMint(amount.AIV, rate, AIV_RATE), 2)
    );

    expect(utils.toFixed(_AIV_PROJECT_OWNER, 2)).to.equal(
      utils.toFixed(AIV_PROJECT_OWNER + entryFee(amount.AIV, AIV_RATE), 2)
    );

    expect(utils.toFixed(_AIV_PLATFORM, 2)).to.equal(
      utils.toFixed(AIV_PLATFORM + platformFee(amount.AIV, AIV_RATE), 2)
    );
  });

  it("shouldn't buy token", async () => {
    if (!events.buy) return;
    const AIV = await SDK.platform.token();
    const otherUser = await getAddress("otherUser");
    await SDK.asset.mint(200, otherUser, AIV, getUser("platformWallet"));
    const { token } = projectList[projectList.length - 1];
    await assertRevert(SDK.trade.buy(100, token, AIV, getUser("otherUser")));
  });

  it("should sell tokens", async () => {
    if (!events.sell) return;
    const { token, custodian } = projectList[projectList.length - 1];
    const user = await getAddress("user");
    const TUSD = await SDK.platform.currency.getAddress("TUSD");
    const TUSD_USER = await SDK.asset.getBalance(user, TUSD);
    await SDK.asset.mint(200, custodian, TUSD, getUser("trueUSDOwner"));

    const { spend, received } = await SDK.trade.sell(amount.TOKEN, token, getUser("user"));
    const TUSD_USER_DIFF = (await SDK.asset.getBalance(user, TUSD)) - TUSD_USER;
    expect(spend).to.equal(amount.TOKEN);
    expect(utils.toFixed(received, 4)).to.equal(utils.toFixed(TUSD_USER_DIFF, 4));
  });

  it("should buy token TUSD", async () => {
    if (!events.buy) return;
    const { token } = projectList[projectList.length - 1];
    const user = await getAddress("user");
    const platformWallet = await SDK.platform.wallet();
    const AIV = await SDK.platform.token();
    const AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
    const TUSD = await SDK.platform.currency.getAddress("TUSD");
    const TUSD_USER = await SDK.asset.getBalance(user, TUSD);
    const TOKEN_USER = await SDK.asset.getBalance(user, token);
    const estimate = await SDK.trade.estimate(amount.TUSD, token, TUSD);
    const [_TUSD, _FEES, _TOKEN] = Object.values(estimate);
    await SDK.trade.buy(amount.TUSD, token, TUSD, getUser("user"));
    const _TUSD_USER = await SDK.asset.getBalance(user, TUSD);
    const _TOKEN_USER = await SDK.asset.getBalance(user, token);
    const _AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
    expect(utils.toFixed(TUSD_USER - _TUSD_USER)).to.equal(_TUSD);
    expect(utils.toFixed(_TOKEN_USER - TOKEN_USER)).to.equal(utils.toFixed(_TOKEN));
    expect(utils.toFixed(_AIV_PLATFORM)).to.equal(utils.toFixed(AIV_PLATFORM + _FEES.platform));
  });

  it("should update rate", async () => {
    const { token } = projectList[projectList.length - 1];
    const auditor = getAddress("DGAddress");
    const totalSupply = await SDK.asset.totalSupply(token);
    const NET = await SDK.asset.NET(token);
    const AUM = utils.toFixed(NET + amount.PL);
    const tx = await SDK.asset.updateRate(
      token,
      AUM,
      "c72b9698fa1927e1dd12d3cf26ed84b2",
      getUser("DGAddress")
    );

    history.push({
      AUM,
      PL: amount.PL,
      NET,
      totalSupply,
      rate: tx.rate,
      amount,
      events
    });

    fs.writeFile(
      "./test/history.json",
      new Uint8Array(Buffer.from(JSON.stringify(history, null, 2))),
      error => {
        if (error) throw error;
      }
    );

    const expectedRate = totalSupply < 1 ? options.initialPrice : AUM / totalSupply;
    expect(utils.toFixed(tx.rate)).to.equal(utils.toFixed(expectedRate));
    expect(tx.auditor).to.equal(auditor);
  });
});
