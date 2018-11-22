module.exports = {
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "_assetAddress",
          "type": "address"
        }
      ],
      "name": "buyAsset",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "sellAsset",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}