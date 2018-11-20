const utils = require("../utils");

const convertedFields = [
  "platformFee",
  "entryFee",
  "exitFee",
  "maxInvestors",
  "initialPrice"
];

const convertUint = (array, name, value) => {
  if (array.includes(name)) {
    return {
      [name]: utils.fromWei(value)
    };
  }
  return {
    [name]: Number(value)
  };
};

const getField = async (key, fields, instance) => {
  const methods = {
    bytes: async name => {
      const field = await instance.methods.getBytes(utils.toHex(name)).call();
      return {
        [name]: utils.hexToString(field)
      };
    },
    constBytes: async name => {
      const field = await instance.methods
        .getConstBytes(utils.toHex(name))
        .call();
      return {
        [name]: utils.hexToString(field)
      };
    },
    uint: async name => {
      const field = await instance.methods.getUint(utils.toHex(name)).call();
      return convertUint(convertedFields, name, field);
    },
    constUint: async name => {
      const field = await instance.methods
        .getConstUint(utils.toHex(name))
        .call();
      return convertUint(convertedFields, name, field);
    },
    address: async name => {
      const field = await instance.methods.getAddress(utils.toHex(name)).call();
      return {
        [name]: field
      };
    },
    constAddress: async name => {
      const field = await instance.methods
        .getConstAddress(utils.toHex(name))
        .call();
      return {
        [name]: field
      };
    }
  };
  const promises = fields.map(name => methods[key](name));
  const list = await Promise.all(promises);
  return list;
};

const getDetails = async (list, instance) => {
  const keys = Object.keys(list);
  const values = Object.values(list);
  const promises = keys.map(async (key, index) => {
    const oneTypeList = await getField(key, values[index], instance);
    return oneTypeList;
  });
  const fieldArrays = await Promise.all(promises);
  let result = {};
  for (let i = 0; i < fieldArrays.length; i++) {
    const array = fieldArrays[i];
    for (let j = 0; j < array.length; j++) {
      const element = array[j];
      result = { ...result, ...element };
    }
  }
  const owner = await instance.methods.owner().call();
  result = { ...result, owner };
  return result;
};

module.exports = async instance => {
  const list = {
    bytes: ["tokenName", "projectName"],
    constBytes: ["tokenSymbol"],
    uint: ["platformFee", "entryFee", "exitFee"],
    constUint: ["type", "initialPrice", "maxTokens", "maxInvestors"],
    address: ["RPC"],
    constAddress: ["token", "auditDB", "custodian"]
  };
  const details = await getDetails(list, instance);
  return details;
};
