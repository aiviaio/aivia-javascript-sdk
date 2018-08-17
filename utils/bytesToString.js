exports.bytesToString = bytes => web3.toAscii(bytes).replace(/\u0000/g, "");
