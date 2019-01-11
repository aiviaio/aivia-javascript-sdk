const { expect } = require("chai");
const projectList = require("../projects");

const SDK = require("../core");

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
