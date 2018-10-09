const AIVIA_SDK = require("../src");

const SDK = new AIVIA_SDK();

test("should return PROXY address", async () => {
  const address = await SDK.getProxyAddress();

  expect(address).toBe(require("../src/ABI/Proxy").address);
});
