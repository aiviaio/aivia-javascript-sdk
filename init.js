const fs = require("fs");

const path = "../ethereum-protocol/";
const SDKPath = "./src/ABI/";

const networkId = 777;
let contracts;

try {
  contracts = require("./test/contracts");
} catch (error) {
  contracts = {};
}

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
  "ConfigWithPermissions",
  "PlatformToken",
  "TrueUSD",
  "PlatformRegistry",
  "TPLRegistry",
  "CustodiansRegistry",
  "EternalStorage"
];

if (!fs.existsSync(SDKPath)) {
  fs.mkdirSync(SDKPath);
}
if (process.env.MODE === "dev") {
  fs.writeFile("./test/projects.json", "[]", () =>
    console.info("successfully clean /test/projects.json")
  );
  fs.writeFile("./test/contracts.json", "{}", () =>
    console.info("successfully clean /test/contracts.json")
  );
  fs.writeFile(
    "./test/history.json",
    `[{
    "AUM": 0,
    "totalSupply": 0,
    "PL": 0,
    "NET": 0,
    "rate": 0.025
  }]`,
    () => console.info("successfully clean /test/history.json")
  );

  process.stdout.write("\x1Bc");

  fs.copyFile(`${path}/config/users.json`, "./test/users.json", err => {
    if (err) throw err;
    console.info("users.json was copied to destination.txt");
  });
}

list.forEach(fileName => {
  fs.readFile(
    `${path}build/contracts/${fileName}.json`,
    "utf8",
    (err, data) => {
      const json = JSON.parse(data);
      const ABI = json.abi;
      if (process.env.MODE === "dev") {
        if (json.networks[networkId]) {
          contracts[fileName] = json.networks[networkId].address;
          fs.writeFile(
            "./test/contracts.json",
            new Uint8Array(Buffer.from(JSON.stringify(contracts, null, 2))),
            error => {
              if (error) throw error;
            }
          );
        }
      }
      const text = `module.exports = ${JSON.stringify(ABI, null, 2)}`;
      const file = new Uint8Array(Buffer.from(text));
      fs.writeFile(`${SDKPath + fileName}.js`, file, error => {
        if (error) throw error;
      });
    }
  );
});
