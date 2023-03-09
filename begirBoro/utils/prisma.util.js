exports.exclude = function (dbObj, excludedFields) {
  for (let key of excludedFields) {
    delete dbObj[key];
  }
  return dbObj;
};
