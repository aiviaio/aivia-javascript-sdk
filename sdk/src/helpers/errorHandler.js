module.exports = promise => {
  try {
    return promise;
  } catch (error) {
    throw new Error(error);
  }
};
