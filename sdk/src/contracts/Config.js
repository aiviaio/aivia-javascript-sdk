const createInstance = require("../helpers/createInstance");
const errorHandler = require("../helpers/errorHandler");
const getConfigDetails = require("../config/getConfigDetails");

const ABI = [
  {
    constant: true,
    inputs: [],
    name: "config",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
const getConfig = async address => {
  this.instance = createInstance(ABI, address, this);
  const configAddress = await errorHandler(
    this.instance.methods.config().call()
  );
  const config = await getConfigDetails(configAddress);
  return config;
};

module.exports = {
  getConfig
};
