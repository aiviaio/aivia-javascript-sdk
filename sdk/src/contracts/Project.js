const Proxy = require("../ABI/Proxy");
const PR = require("../ABI/ProjectsRegistry");
const web3 = require("../core");
const options = require("../options");
const errorHandler = require("../helpers/errorHandler");

const proxy = new web3.eth.Contract(Proxy.abi, Proxy.address);
const pr = new web3.eth.Contract(PR.abi, PR.address);

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
  { from, gasPrice = options.gasPrice }
) => {
  const action = proxy.methods.deployProject(
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
  );
  const a = await pr.methods.getProjectList().call();
  console.log(a.length);
  await errorHandler(
    action.send({
      from,
      gasPrice,
      gas: options.gasLimit
    })
  );
  const b = await pr.methods.getProjectList().call();
  console.log(b.length);
};

module.exports = {
  deployProject
};
