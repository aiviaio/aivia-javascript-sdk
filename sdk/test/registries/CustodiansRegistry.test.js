const { expect } = require("chai");
const AIVIA_SDK = require("../../src");
const projectList = require("../projects");
const ENTRY_POINT = require("../../src/ABI/EntryPoint").address;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

describe("CustodiansRegistry", () => {
  it("should return custodians", async () => {
    const custodians = await SDK.custodian.getList();
    const [custodian] = custodians;
    this.name = custodian.name;
    this.address = custodian.address;
    expect(custodian.contracts.length).to.equal(projectList.length);
  });

  it("should return custodian details", async () => {
    const custodian = await SDK.custodian.getDetails(this.address);
    expect(custodian.name).to.equal(this.name);
  });
});
