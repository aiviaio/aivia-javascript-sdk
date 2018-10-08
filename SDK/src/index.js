const EntryPoint = require("./contracts/EntryPoint");

EntryPoint.getProxyAddress().then(address => console.log(address));
