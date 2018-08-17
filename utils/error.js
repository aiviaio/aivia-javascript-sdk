module.exports = {
  shouldRevert: error => {
    assert(
      error.message === "VM Exception while processing transaction: revert",
      "error message must be 'VM Exception while processing transaction: revert'"
    );
  },

  shouldThrowArgError: error => {
    assert(
      error.message === "Invalid number of arguments to Solidity function",
      "error message must be 'Invalid number of arguments to Solidity function'"
    );
  }
};
