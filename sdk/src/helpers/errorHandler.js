module.exports = promise => {
  try {
    return promise;
  } catch (error) {
    return error;
  }
};
