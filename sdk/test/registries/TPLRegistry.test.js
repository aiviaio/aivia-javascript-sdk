// const { expect } = require("chai");
const AIVIA_SDK = require("../../src");
const { getAddress } = require("../helpers/users");
const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("TPLRegistry", () => {
  describe("addUser", () => {
    it("should add user", async () => {
      const user = await getAddress("user");
      const DGAddress = await getAddress("DGAddress");
      await SDK.auditors.addUser(user, 1, 1, 0, {
        from: DGAddress,
        privateKey:
          "8129dd9c4013b5b6070cdbeae3f9eb9ffdc2bfb06d69ce22f8cee15b5ff111b6"
      });
    });

    it("should return users list", async () => {
      const userList = await SDK.auditors.getUsersList();
      console.info(userList);
    });
  });
});
