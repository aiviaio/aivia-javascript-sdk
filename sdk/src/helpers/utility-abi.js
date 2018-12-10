module.exports = {
  config: [
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
  ],
  stringSymbol: [
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ],
  bytes32Symbol: [
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "bytes32"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ],
  updatePermission: [
    {
      constant: false,
      inputs: [
        {
          name: "_country",
          type: "uint8"
        },
        {
          name: "_walletTypes",
          type: "uint8[]"
        }
      ],
      name: "updatePermissionByCountry",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ]
};
