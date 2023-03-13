const generateError = (errorObj, status, name = null) => {
  errorObj.status = status;
  errorObj.name = name;
  return errorObj;
};

module.exports = generateError;
