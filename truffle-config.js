/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const accounts = require("./utils/accounts");

module.exports = {
  /*
   * See <http://truffleframework.com/docs/advanced/configuration>
   * to customize your Truffle configuration!
   */
  mocha: {
    useColors: true
  },
  networks: {
    ganache: {
      gas: 6721975,
      gasPrice: 4000000000,
      host: "127.0.0.1",
      network_id: "*",
      // port: 8545 for ganache-cli
      port: 7545,
      from: accounts.platform
    }
  }
};
