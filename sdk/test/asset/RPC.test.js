const { expect } = require("chai");
const fs = require("fs");
const options = require("../deploy/Deployer.test");
const projectList = require("../projects");
const { getAddress, getUser } = require("../helpers/users");
const utils = require("../../src/utils");
const assertRevert = require("../helpers/assertRevert");
const history = require("../history");

const SDK = require("../core");

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
  const tokens = inUSD / rate;
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
    const { owner, token } = projectList[0];
    const AIV_USER = await SDK.asset.getBalance(user, AIV);
    const AIV_PROJECT_OWNER = await SDK.asset.getBalance(owner, AIV);
    const AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
    const TOKEN_USER = await SDK.asset.getBalance(user, token);
    const rate = await SDK.asset.getRate(token);
    const AIV_RATE = await SDK.platform.currency.getRate(AIV);

    await SDK.trade.buy(
      amount.AIV,
      token,
      AIV,
      { from: getAddress("user") },
      value => {
        amount.gas = value;
      },
      true
    );
    const options = getUser("user");
    const { spend, received, fees } = await SDK.trade.buy(
      amount.AIV,
      token,
      AIV,
      {
        ...options,
        gasLimit: amount.gas
      }
    );

    const investors = await SDK.asset.getInvestors(token);
    const _AIV_USER = await SDK.asset.getBalance(user, AIV);
    const _AIV_PROJECT_OWNER = await SDK.asset.getBalance(owner, AIV);
    const _AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
    const _TOKEN_USER = await SDK.asset.getBalance(user, token);

    const estimate = await SDK.trade.estimate(amount.AIV, token, AIV);
    const [_spend, _received, _fees] = Object.values(estimate);

    expect(_spend).to.equal(utils.toFixed(spend));
    expect(_fees.platform).to.equal(utils.toFixed(fees.platform));
    expect(_fees.manager).to.equal(utils.toFixed(fees.manager));
    expect(_received).to.equal(utils.toFixed(received));

    expect(investors).to.greaterThan(0);

    const entryFeeValue = entryFee(amount.AIV, AIV_RATE);
    const platformFeeValue = platformFee(amount.AIV, AIV_RATE);
    const allFeesAmount = entryFeeValue + platformFeeValue;
    expect(utils.toFixed(_AIV_USER)).to.equal(
      utils.toFixed(AIV_USER - amount.AIV - allFeesAmount)
    );

    expect(utils.toFixed(_TOKEN_USER)).to.equal(
      utils.toFixed(TOKEN_USER + willMint(amount.AIV, rate, AIV_RATE))
    );

    expect(utils.toFixed(_AIV_PROJECT_OWNER)).to.equal(
      utils.toFixed(AIV_PROJECT_OWNER + entryFeeValue)
    );

    expect(utils.toFixed(_AIV_PLATFORM)).to.equal(
      utils.toFixed(AIV_PLATFORM + platformFeeValue)
    );
    expect(amount.gas).to.greaterThan(0);
  });

  it("shouldn't buy token", async () => {
    if (!events.buy) return;
    const AIV = await SDK.platform.token();
    const otherUser = await getAddress("otherUser");
    await SDK.asset.mint(200, otherUser, AIV, getUser("platformWallet"));
    const { token } = projectList[0];
    await assertRevert(SDK.trade.buy(100, token, AIV, getUser("otherUser")));
  });

  it("should sell tokens", async () => {
    if (!events.sell) return;
    const { token, custodian } = projectList[0];
    const user = await getAddress("user");
    const TUSD = await SDK.platform.currency.getAddress("TUSD");
    const TUSD_USER = await SDK.asset.getBalance(user, TUSD);
    await SDK.asset.mint(200, custodian, TUSD, getUser("trueUSDOwner"));
    await SDK.asset.mint(
      100,
      getAddress("external"),
      TUSD,
      getUser("trueUSDOwner")
    );

    const { spend, received, fees } = await SDK.trade.sell(
      amount.TOKEN,
      token,
      getUser("user")
    );
    const TUSD_USER_DIFF = (await SDK.asset.getBalance(user, TUSD)) - TUSD_USER;
    const estimate = await SDK.trade.estimate(amount.TOKEN, token);
    const [_spend, _received, _fees] = Object.values(estimate);

    expect(_spend).to.equal(utils.toFixed(spend));
    expect(_fees.platform).to.equal(utils.toFixed(fees.platform));
    expect(_fees.manager).to.equal(utils.toFixed(fees.manager));
    expect(_received).to.equal(utils.toFixed(received));

    expect(spend).to.equal(amount.TOKEN);
    expect(utils.toFixed(received)).to.equal(utils.toFixed(TUSD_USER_DIFF));
  });

  it("should buy token TUSD", async () => {
    if (!events.buy) return;
    const { token } = projectList[0];
    const user = await getAddress("user");
    const platformWallet = await SDK.platform.wallet();
    const AIV = await SDK.platform.token();
    const AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);
    const TUSD = await SDK.platform.currency.getAddress("TUSD");
    const TUSD_USER = await SDK.asset.getBalance(user, TUSD);
    const TOKEN_USER = await SDK.asset.getBalance(user, token);
    const tx = await SDK.trade.buy(amount.TUSD, token, TUSD, getUser("user"));

    const { spend, received, fees } = tx;

    await SDK.trade.buy(
      amount.TUSD,
      token,
      TUSD,
      { from: getAddress("user") },
      value => {
        console.info("GAS:", value);
      },
      true
    );

    const _TUSD_USER = await SDK.asset.getBalance(user, TUSD);
    const _TOKEN_USER = await SDK.asset.getBalance(user, token);
    const _AIV_PLATFORM = await SDK.asset.getBalance(platformWallet, AIV);

    const estimate = await SDK.trade.estimate(amount.TUSD, token, TUSD);
    const [_spend, _received, _fees] = Object.values(estimate);

    expect(_spend).to.equal(utils.toFixed(spend));
    expect(_fees.platform).to.equal(utils.toFixed(fees.platform));
    expect(_fees.manager).to.equal(utils.toFixed(fees.manager));
    expect(_received).to.equal(utils.toFixed(received));

    expect(utils.toFixed(TUSD_USER - _TUSD_USER)).to.equal(_spend);
    expect(utils.toFixed(_TOKEN_USER - TOKEN_USER)).to.equal(
      utils.toFixed(_received)
    );
    expect(utils.toFixed(_AIV_PLATFORM)).to.equal(
      utils.toFixed(AIV_PLATFORM + _fees.platform)
    );
  });

  it("should buy token TUSD", async () => {
    const { token } = projectList[0];
    const TUSD = await SDK.platform.currency.getAddress("TUSD");
    const AIV = await SDK.platform.currency.getAddress("AIV");
    const tx1 = await SDK.trade.buy(10, token, TUSD, getUser("external"));
    const tx2 = await SDK.trade.buy(2, token, AIV, getUser("external"));
    expect(utils.toFixed(tx1.received)).to.greaterThan(0);
    expect(utils.toFixed(tx2.received)).to.greaterThan(0);
  });

  it("should transfer Token to other", async () => {
    const { token } = projectList[0];
    const value = 1;
    const BALANCE = await SDK.asset.getBalance(getAddress("user"), token);
    const USER_BALANCE = await SDK.asset.getBalance(
      getAddress("otherUser"),
      token
    );
    await SDK.asset.transfer(
      getAddress("otherUser"),
      value,
      token,
      { from: getAddress("user") },
      value => {
        amount.gas = value;
      },
      true
    );
    const options = getUser("user");
    await SDK.asset.transfer(getAddress("otherUser"), value, token, {
      ...options,
      gasLimit: amount.gas
    });
    const _USER_BALANCE = await SDK.asset.getBalance(
      getAddress("otherUser"),
      token
    );
    const _BALANCE = await SDK.asset.getBalance(getAddress("user"), token);
    expect(utils.toFixed(BALANCE - _BALANCE)).to.equal(value);
    expect(utils.toFixed(_USER_BALANCE)).to.equal(USER_BALANCE + value);
  });

  it("should update rate", async () => {
    const { token } = projectList[0];
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

    const expectedRate =
      totalSupply < 1 ? options.initialPrice : AUM / totalSupply;
    expect(utils.toFixed(tx.rate)).to.equal(utils.toFixed(expectedRate));
    expect(tx.auditor).to.equal(auditor);
  });
});
