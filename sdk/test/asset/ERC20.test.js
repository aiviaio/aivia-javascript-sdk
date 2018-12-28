const { expect } = require("chai");
const { getAddress, getUser } = require("../helpers/users");
const utils = require("../../src/utils");

const SDK = require("../core");

describe("ERC20", () => {
  it("should return totalSupply", async () => {
    const AIV = await SDK.platform.token();
    const totalSupply = await SDK.asset.totalSupply(AIV);
    expect(totalSupply).that.is.a("number");
  });

  it("should mint AIV to user", async () => {
    const user = await getAddress("user");

    const AIV = await SDK.platform.token();

    const userAIVBalance = utils.toFixed(await SDK.asset.getBalance(user, AIV), 4);
    const amount = 250;
    const { from, to, value } = await SDK.asset.mint(amount, user, AIV, getUser("platformWallet"));

    expect(utils.toFixed(await SDK.asset.getBalance(user, AIV), 4)).to.equal(
      utils.toFixed(userAIVBalance + amount, 4)
    );

    expect(from).to.equal(utils.ZERO_ADDRESS);
    expect(to).to.equal(user);
    expect(value).to.equal(amount);
  });

  it("should transfer AIV to other", async () => {
    const AIV = await SDK.platform.token();
    const amount = 9.44413;
    const AIV_BALANCE = await SDK.asset.getBalance(getAddress("otherUser"), AIV);
    await SDK.asset.transfer(getAddress("otherUser"), amount, AIV, getUser("user"));
    const _AIV_BALANCE = await SDK.asset.getBalance(getAddress("otherUser"), AIV);
    expect(utils.toFixed(_AIV_BALANCE - AIV_BALANCE, 6)).to.equal(amount);
  });

  it("should transfer ETH to other", async () => {
    const amount = 0.0001;
    const ETH = await SDK.asset.getBalance(getAddress("otherUser"));
    await SDK.asset.transferETH(getAddress("otherUser"), amount, getUser("user"));
    const _ETH = await SDK.asset.getBalance(getAddress("otherUser"));
    expect(utils.toFixed(_ETH - ETH)).to.equal(amount);
  });

  it("should transfer ETH to other", async () => {
    let estimated = 0;
    function estimateGasLimit(value) {
      estimated = value;
    }
    const amount = "0.00000000000000007";
    await SDK.asset.transferETH(
      getAddress("otherUser"),
      amount,
      { from: getAddress("user") },
      estimateGasLimit
    );
    expect(estimated).to.greaterThan(0);
    const options = getUser("user");
    await SDK.asset.transferETH(getAddress("otherUser"), amount, {
      ...options,
      gasLimit: estimated
    });
  });
});
