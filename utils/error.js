exports.shouldRevert = error => {
  assert(
    error.message === "VM Exception while processing transaction: revert",
    "error message must be 'VM Exception while processing transaction: revert'"
  );
};
exports.isError = error => {
  assert(
    error.message === "VM Exception while processing transaction: revert",
    "error message must be 'VM Exception while processing transaction: revert'"
  );
};
