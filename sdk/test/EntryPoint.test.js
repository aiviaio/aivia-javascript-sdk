const { expect } = require("chai");
const AIVIA_SDK = require("../src");
const assertRevert = require("./helpers/assertRevert");
const getAccounts = require("./helpers/getAccounts");

const FAKE_ADDRESS = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

const SDK = new AIVIA_SDK();
describe("EntryPoint", () => {
  describe("getProxyAddress", () => {
    it("return PROXY address", async () => {
      const address = await SDK.getProxyAddress();
      expect(address).to.equal(require("../src/ABI/Proxy").address);
    });
  });

  describe("setProxyAddress", () => {
    it(" revert", async () => {
      await assertRevert(
        SDK.setProxyAddress(FAKE_ADDRESS, { from: await getAccounts("user") })
      );
    });

    it("change PROXY_ADDRESS", async () => {
      await SDK.setProxyAddress(FAKE_ADDRESS, {
        from: await getAccounts("DGAddress")
      });
      const address = await SDK.getProxyAddress();
      expect(address).to.equal(FAKE_ADDRESS);
      // set address back
      await SDK.setProxyAddress(require("../src/ABI/Proxy").address, {
        from: await getAccounts("DGAddress")
      });
    });
  });
});
