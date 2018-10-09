rm -rf ./build
npx truffle migrate --compile-all --reset --network ganache
npx truffle console --network ganache