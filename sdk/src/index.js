const EntryPoint = require("./contracts/EntryPoint");
const config = require("./config");

function SDK(ENTRY_POINT, HTTP_PROVIDER = "http://127.0.0.1:8545") {
  // console.log(ENTRY_POINT, HTTP_PROVIDER);
  config.HTTP_PROVIDER = HTTP_PROVIDER;
  config.ENTRY_POINT = ENTRY_POINT;
  this.getProxyAddress = () => EntryPoint.getProxyAddress();
}

module.exports = SDK;
