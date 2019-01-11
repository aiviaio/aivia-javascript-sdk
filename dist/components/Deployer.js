"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Proxy = require("../ABI/Proxy");

var AssetsRegistry = require("./AssetsRegistry");

var ERC20 = require("./ERC20");

var config = require("../config");

var utils = require("../utils");

var signedTX = require("../helpers/signedTX");

var _require = require("../helpers/createInstance"),
    createInstance = _require.createInstance;

var _require2 = require("../helpers/errorHandler"),
    errorHandler = _require2.errorHandler,
    isObject = _require2.isObject,
    isInteger = _require2.isInteger,
    isZeroAddress = _require2.isZeroAddress;

var Error = require("../helpers/Error");

var EntryPoint = require("./EntryPoint");

var ReselectData = require("../projects/ReselectData");
/**
 * @module Deploy
 * @typicalname SDK.project
 */

/**
 * deploy project
 * @param {number} type project type ID
 * @param {object} params
 * @param {string} params.projectName maximum length 32 characters
 * @param {object} params.tokenDetails  {tokenName, tokenSymbol, initialPrice, maxTokens, maxInvestors}
 *
 * @param {string} params.tokenDetails.tokenName maximum length 32 characters
 * @param {string} params.tokenDetails.tokenSymbol maximum length 32 characters
 * @param {number} params.tokenDetails.initialPrice
 * @param {number} params.tokenDetails.maxTokens
 * @param {number} params.tokenDetails.maxInvestors maximum number of investors, if equal to "0" then there are no restrictions
 *
 * @param {object} params.fees {platformFee, entryFee, exitFee}
 * @param {number} params.fees.platformFee indicate in percent
 * @param {number} params.fees.entryFee indicate in percent
 * @param {number} params.fees.exitFee indicate in percent
 * @param {address} params.custodian custodian wallet address
 * @param {object} params.permissions {countries, walletTypes, rule}
 * @param {array.<number>} params.permissions.countries
 * @param {array.<number>} params.permissions.walletTypes
 * @param {boolean} params.permissions.rule
 * @param {object} options
 * @param {address} options.address wallet address
 * @param {string} options.privateKey private key
 * @param {number} options.gasPrice gas price
 * @param {function} callback function(hash)
 * @param {boolean} estimate is need estimate
 * @return {components} deployed project components
 */


exports.deploy =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(type, params, options, callback) {
    var _instance$methods;

    var tokenSymbol, gasPrice, approximateCost, balance, tokenAddress, proxyAddress, instance, _params, deployAction, initAction, _ref2, blockNumber, _ref3, _ref4, returnValues;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isInteger({
              type: type
            });
            isObject({
              params: params,
              options: options
            });
            tokenSymbol = params.tokenDetails.tokenSymbol;
            gasPrice = options.gasPrice || config.get("DEFAULT_GAS_PRICE");
            approximateCost = utils.fromWei(gasPrice * 8000000);
            _context.next = 7;
            return errorHandler(ERC20.getBalance(options.from));

          case 7:
            balance = _context.sent;
            _context.next = 10;
            return errorHandler(AssetsRegistry.getAssetAddress(tokenSymbol));

          case 10:
            tokenAddress = _context.sent;

            if (balance < approximateCost) {
              Error({
                name: "transaction",
                message: "For deployment, the balance must be at least ".concat(approximateCost, " ETH")
              });
            }

            isZeroAddress({
              tokenAddress: {
                value: tokenAddress,
                message: "".concat(tokenSymbol, " already exist")
              }
            });
            _context.next = 15;
            return errorHandler(EntryPoint.getProxyAddress());

          case 15:
            proxyAddress = _context.sent;
            instance = createInstance(Proxy.abi, proxyAddress);
            _params = ReselectData.input(type, params);
            deployAction = (_instance$methods = instance.methods).deployProject.apply(_instance$methods, (0, _toConsumableArray2.default)(_params));
            initAction = instance.methods.initProject();
            _context.next = 22;
            return errorHandler(signedTX({
              data: deployAction,
              from: options.from,
              to: proxyAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              callback: callback,
              action: "deploy"
            }));

          case 22:
            _context.next = 24;
            return errorHandler(signedTX({
              data: initAction,
              from: options.from,
              to: proxyAddress,
              privateKey: options.privateKey,
              gasPrice: options.gasPrice,
              gasLimit: options.gasLimit,
              callback: callback,
              action: "deploy"
            }));

          case 24:
            _ref2 = _context.sent;
            blockNumber = _ref2.blockNumber;
            _context.next = 28;
            return instance.getPastEvents("NewProject", {
              filter: {
                owner: options.from
              },
              fromBlock: blockNumber,
              toBlock: "latest"
            });

          case 28:
            _ref3 = _context.sent;
            _ref4 = (0, _slicedToArray2.default)(_ref3, 1);
            returnValues = _ref4[0].returnValues;
            return _context.abrupt("return", ReselectData.output(type, returnValues));

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();