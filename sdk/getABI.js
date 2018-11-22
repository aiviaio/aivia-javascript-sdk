const fs = require("fs");

const path = "../protocol/build/contracts/";
const SDKPath = "./src/ABI/";

const networkId = 777;
const list = [
  "ProjectAudit",
  "AssetsRegistry",
  "Proxy",
  "EntryPoint",
  "ProjectsRegistry",
  "SCRegistry",
  "RPC",
  "ERC20Mintable",
  "ProjectConfig",
  "PlatformToken",
  "OpenEndDeployer",
  "TrueUSD",
  "PlatformRegistry"
];
process.stdout.write("\x1Bc");

if (!fs.existsSync(SDKPath)) {
  fs.mkdirSync(SDKPath);
}

fs.writeFile("./test/projects.json", "[]", () =>
  console.info("successfully clean /test/projects.json")
);

list.forEach(contract => {
  fs.readFile(`${path + contract}.json`, "utf8", (err, data) => {
    const object = {};
    const json = JSON.parse(data);
    object.abi = json.abi;
    if (process.env.MODE === "dev") {
      if (json.networks[networkId]) {
        object.address = json.networks[networkId].address;
      }
    }
    const text = `module.exports = ${JSON.stringify(object, null, 2)}`;
    const file = new Uint8Array(Buffer.from(text));
    fs.writeFile(`${SDKPath + contract}.js`, file, error => {
      if (error) throw error;
    });
  });
});
