const AIVIA_SDK = require("../src");
const ENTRY_POINT =
  require("../src/ABI/EntryPoint").address || process.env.ENTRY_POINT;

const SDK = new AIVIA_SDK(ENTRY_POINT, "http://127.0.0.1:8545");

module.exports = SDK;
