const { expect } = require("chai");
const { getAddress, getUser } = require("../helpers/users");

const SDK = require("../core");

describe("TPLRegistry", () => {
  describe("addUser", () => {
    it("should add user", async () => {
      const user = await getAddress("user");
      const otherUser = await getAddress("otherUser");
      await SDK.auditor.addUser(user, 1, 1, 0, getUser("DGAddress"));
      await SDK.auditor.addUser(otherUser, 154, 1, 0, getUser("DGAddress"));
    });

    it("should return users list", async () => {
      const user = await getAddress("user");
      const userList = await SDK.auditor.getUsersList();
      expect(userList[0].address).to.equal(user);
    });
  });
});
