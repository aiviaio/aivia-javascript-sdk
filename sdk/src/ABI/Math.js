module.exports = {
  "ABI": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "percent",
          "type": "uint256"
        }
      ],
      "name": "getValueByPercent",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function",
      "signature": "0x33b62813"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "decimals",
          "type": "uint256"
        },
        {
          "name": "percent",
          "type": "uint256"
        }
      ],
      "name": "getPartialAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function",
      "signature": "0x98024a8b"
    }
  ],
  "address": "0x9ca718b47d970b81d025794a99b6B29523eE943B"
}