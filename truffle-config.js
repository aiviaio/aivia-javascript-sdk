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
      gas: 4712388,
      gasPrice: 4000000000,
      host: "127.0.0.1",
      network_id: "*",
      port: 7545
    }
  }
};
