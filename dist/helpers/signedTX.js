"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var EthereumTx = require("ethereumjs-tx");

var _require = require("../helpers/createInstance"),
    getProvider = _require.getProvider;

var _require2 = require("../helpers/errorHandler"),
    isFunction = _require2.isFunction,
    isAddress = _require2.isAddress,
    isString = _require2.isString,
    isInteger = _require2.isInteger,
    errorHandler = _require2.errorHandler;

var config = require("../config");

var getNonce = require("./getNonce");

var additionalGasLimit = {
  trade: 10000,
  deploy: 120000
};

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(params) {
    var isEstimateGas, web3, TMP, txParams, gasLimit, additional, transaction;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isFunction({
              callback: params.callback
            });
            isAddress({
              from: params.from,
              to: params.to
            });
            isEstimateGas = typeof params.callback === "function" && params.estimate;

            if (!isEstimateGas) {
              isString({
                privateKey: params.privateKey
              });
            }

            if (params.nonce) {
              isInteger({
                nonce: params.nonce
              });
            }

            web3 = getProvider();
            TMP = {};

            if (params.privateKey) {
              TMP.privateKey = Buffer.from(params.privateKey, "hex");
              delete params.privateKey;
            }

            _context.t0 = params.nonce;

            if (_context.t0) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return errorHandler(getNonce(params.from));

          case 12:
            _context.t0 = _context.sent;

          case 13:
            _context.t1 = _context.t0;
            _context.t2 = params.from;
            _context.t3 = params.to;
            _context.t4 = params.value;
            _context.t5 = params.gasPrice || config.get("DEFAULT_GAS_PRICE");
            txParams = {
              nonce: _context.t1,
              from: _context.t2,
              to: _context.t3,
              value: _context.t4,
              gasPrice: _context.t5
            };
            gasLimit = null;

            if (!params.value) {
              _context.next = 24;
              break;
            }

            _context.next = 23;
            return web3.eth.estimateGas(txParams);

          case 23:
            gasLimit = _context.sent;

          case 24:
            if (!params.data) {
              _context.next = 38;
              break;
            }

            additional = additionalGasLimit[params.action] || 0;
            _context.prev = 26;
            _context.next = 29;
            return params.data.estimateGas(params.data, {
              from: params.from
            });

          case 29:
            _context.t6 = _context.sent;
            _context.t7 = additional;
            gasLimit = _context.t6 + _context.t7;
            _context.next = 37;
            break;

          case 34:
            _context.prev = 34;
            _context.t8 = _context["catch"](26);
            gasLimit = 375000;

          case 37:
            txParams.data = params.data.encodeABI();

          case 38:
            txParams.gasLimit = params.gasLimit || gasLimit || 8000000; // return estimated gas limit

            if (!isEstimateGas) {
              _context.next = 42;
              break;
            }

            params.callback(txParams.gasLimit);
            return _context.abrupt("return", txParams.gasLimit);

          case 42:
            Object.freeze(txParams);
            TMP.rawTx = new EthereumTx(txParams);
            TMP.rawTx.sign(TMP.privateKey);
            delete TMP.privateKey;
            TMP.serializedTx = TMP.rawTx.serialize();
            delete TMP.rawTx;
            transaction = web3.eth.sendSignedTransaction("0x".concat(TMP.serializedTx.toString("hex")));
            transaction.once("transactionHash", function (hash) {
              if (typeof params.callback === "function") {
                params.callback(hash);
              }
            });
            delete TMP.serializedTx;
            return _context.abrupt("return", transaction);

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[26, 34]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();