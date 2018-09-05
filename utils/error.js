module.exports = {
  shouldRevert: error => {
    assert(error.message.includes("revert"));
  },

  shouldThrowArgError: error => {
    assert(
      error.message === "Invalid number of arguments to Solidity function",
      "error message must be 'Invalid number of arguments to Solidity function'"
    );
  }
};
