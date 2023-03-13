const userInfoProp = ["email", "address", "sex", "weight"];

exports.userInfoDao = (user) => {
  const result = {};
  for (const userProp of userInfoProp) {
    result[userProp] = user[userProp];
  }
  return result;
};
