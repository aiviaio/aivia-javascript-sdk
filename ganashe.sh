rm -rf ./build
truffle migrate --compile-all --reset --network ganache
truffle console --network ganache