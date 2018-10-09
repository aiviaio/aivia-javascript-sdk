const fs = require("fs");

const path = "../protocol/build/contracts/";
const SDKPath = "./src/ABI/";

const list = fs.readdirSync(path);
const networkId = 777;

list.forEach(contract => {
  fs.readFile(path + contract, "utf8", (err, data) => {
    const object = {};
    const json = JSON.parse(data);
    object.abi = json.abi;
    if (json.networks[networkId]) {
      object.address = json.networks[networkId].address;
    }
    const fileName = contract.replace(".json", ".js");
    const text = `module.exports = ${JSON.stringify(object, null, 2)}`;
    const file = new Uint8Array(Buffer.from(text));
    fs.writeFile(SDKPath + fileName, file, error => {
      if (error) throw error;
    });
  });
});
