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
      .send({ from })
  );
};

module.exports = {
  deployProject
};
