const Proxy = require("../ABI/Proxy");
const web3 = require("../core");
const errorHandler = require("../helpers/errorHandler");

const proxy = new web3.eth.Contract(Proxy.abi, Proxy.address);

/**
 * deploy project
 */
const deployProject = async (
  {
    projectName,
    tokenName,
    tokenSymbol,
    projectTypeID,
    maxTokens,
    maxInvestors,
    initialPrice,
    platformFee,
    entryFee,
    exitFee,
    custodianAddress
  },
  { from }
) => {
  console.log(custodianAddress);
  console.log("0x09B4A049763b08cD907C8Fbe9c52580E6a4Cc96e");
  await errorHandler(
    proxy.methods
      .deployProject(
        [
          web3.utils.utf8ToHex(projectName),
          web3.utils.utf8ToHex(tokenName),
          web3.utils.utf8ToHex(tokenSymbol)
        ],
        [
          projectTypeID,
          maxTokens,
          maxInvestors,
          web3.utils.toWei(initialPrice.toString(), "ether")
        ],
        [
          web3.utils.toWei(platformFee.toString(), "ether"),
          web3.utils.toWei(entryFee.toString(), "ether"),
          web3.utils.toWei(exitFee.toString(), "ether")
        ],
        custodianAddress
      )
      .send({
        from,
        gasPrice: 4000000000,
        gas: 6721975
      })
  );
};

module.exports = {
  deployProject
};

// app.deployProject(["0x5468697320697320746573742070726f6a656374","0x45575420546f6b656e", "0x455754"], [2, 1000, 100, "100000000000000000"], ["200000000000000000", "2200000000000000000", "1100000000000000000"], "0x09B4A049763b08cD907C8Fbe9c52580E6a4Cc96e", {from: "0xf0bfe92ab08A01e75a83E4f226b311894F068871"});
