const { expect } = require("chai");
const { getUser } = require("../helpers/users");
const assertRevert = require("../helpers/assertRevert");
const projectList = require("../projects");
const { permissions } = require("../deploy/Deployer.test");
const SDK = require("../core");

describe("Permissions", () => {
  it("should assert revert when update permission", async () => {
    const { config } = projectList[projectList.length - 1];
    await assertRevert(
      SDK.project.updatePermission(
        config,
        permissions.countries[0],
        permissions.walletTypes,
        getUser("external")
      )
    );
  });

  it("should update permission", async () => {
    const { config } = projectList[projectList.length - 1];
    await SDK.project.updatePermission(
      config,
      permissions.countries[0],
      permissions.walletTypes,
      getUser("projectOwner")
    );
  });

  it("should return permissions rule", async () => {
    const { config } = projectList[0];
    const rule = await SDK.project.getPermissionsRule(config);
    expect(rule).to.eq(permissions.rule);
  });

  it("should return  assert revert", async () => {
    await assertRevert(
      SDK.project.getPermissionsRule(
        "0xDc0484E5432e6BEB900612A51cC4739003502dfD"
      )
    );
  });

  it("should return permissions wallet types", async () => {
    const { config } = projectList[0];
    const walletTypes = await SDK.project.getPermissionsList(
      config,
      permissions.countries[0]
    );
    expect(walletTypes).to.deep.equal(permissions.walletTypes);
  });

  it("should return empty array", async () => {
    const { config } = projectList[0];
    const walletTypes = await SDK.project.getPermissionsList(config, 0);
    expect(walletTypes).to.deep.equal([]);
  });
});