const AssetsRegistry = require("./AssetsRegistry");
const Asset = require("./Asset");
const { errorHandler } = require("../helpers/errorHandler");

const getRatingsList = async () => {
  const addressesList = await errorHandler(AssetsRegistry.getAssetsList());

  const tokensList = addressesList.map(async ({ address }) => {
    const symbol = await AssetsRegistry.getAssetSymbol(address);
    const price = await Asset.getRate(address);
    const investors = await Asset.getInvestorsCount(address);
    return { symbol, address, investors, price };
  });

  return Promise.all(tokensList);
};
module.exports = {
  getRatingsList
};
