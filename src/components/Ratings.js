const AssetsRegistry = require("./AssetsRegistry");
const Asset = require("./Asset");
const { errorHandler } = require("../helpers/errorHandler");

const getRatingsList = async () => {
  const addressesList = await errorHandler(AssetsRegistry.getList());
  const tokensList = addressesList.map(async ({ address }) => {
    const symbol = await errorHandler(AssetsRegistry.getAssetSymbol(address));
    const price = await errorHandler(Asset.getRate(address));
    const investors = await errorHandler(Asset.getInvestors(address));
    return { symbol, address, investors, price };
  });

  return Promise.all(tokensList);
};
module.exports = {
  getRatingsList
};
