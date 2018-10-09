const AIVIA_SDK = require("../src");

const SDK = new AIVIA_SDK();

test("should return PROXY address", () => {
  const address = SDK.getProxyAddress();
  console.log(address);
});
