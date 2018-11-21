// const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const projectList = require("./projects");
const { getAddress } = require("./helpers/users");

const ENTRY_POINT = require("../src/ABI/EntryPoint").address;
const AIV = require("../src/ABI/PlatformToken").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("RPC", () => {
  describe("buyToken", () => {
    it("should buy token", async () => {
      const user = await getAddress("user");
      const tokenAddress = projectList[0].token;
      await SDK.token.buy(10 * 10 ** 18, tokenAddress, AIV, {
        from: user,
        privateKey:
          "4948e1d0b910f1abcf5bf362709d536c466f3aec324d1685a7d6ecdf889c1c3a"
      });
    });
  });
});
