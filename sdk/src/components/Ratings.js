const AssetsRegistry = require("./AssetsRegistry");
const Asset = require("./Asset");
const errorHandler = require("../helpers/errorHandler");

const getRatingsList = async () => {
  const addressesList = await errorHandler(AssetsRegistry.getAssetsList());

  const tokensList = addressesList.map(async ({ address }) => {
    const symbol = await AssetsRegistry.getAssetSymbol(address);
    const price = await Asset.getAssetPrice(address);
    const investors = Number(await Asset.getInvestorsCount(address));
    return { symbol, address, investors, price };
  });
  return Promise.all(tokensList);
};
module.exports = {
  getRatingsList
};
