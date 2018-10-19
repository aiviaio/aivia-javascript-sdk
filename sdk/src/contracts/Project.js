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
  const txResult = await errorHandler(
    proxy.methods
      .deployProject(
        [
          web3.utils.utf8ToHex(projectName),
          web3.utils.utf8ToHex(tokenName),
          web3.utils.utf8ToHex(tokenSymbol)
        ],
        [
          web3.eth.abi.encodeParameter("uint256", projectTypeID),
          web3.eth.abi.encodeParameter("uint256", maxTokens),
          web3.eth.abi.encodeParameter("uint256", maxInvestors),
          web3.eth.abi.encodeParameter(
            "uint256",
            web3.utils.toWei(initialPrice.toString(), "ether")
          )
        ],
        [
          web3.eth.abi.encodeParameter(
            "uint256",
            web3.utils.toWei(platformFee.toString(), "ether")
          ),
          web3.eth.abi.encodeParameter(
            "uint256",
            web3.utils.toWei(entryFee.toString(), "ether")
          ),
          web3.eth.abi.encodeParameter(
            "uint256",
            web3.utils.toWei(exitFee.toString(), "ether")
          )
        ],
        custodianAddress
      )
      .call({ from: web3.utils.toChecksumAddress(from) })
  );
  return txResult;
};

module.exports = {
  deployProject
};
