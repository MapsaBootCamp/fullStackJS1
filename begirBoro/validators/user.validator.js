const { body, check } = require("express-validator");
const db = require("../db");

exports.userCreateValidator = [
  body("email").isEmail().trim().escape(),
  check("email").custom(async (val) => {
    try {
      const user = await db.user.findFirst({
        where: {
          email: val,
        },
      });
      if (user) {
        return Promise.reject("chenin useri darim!");
      }
      return val;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),
  check("address").custom((val) => {
    if (val !== "tehran") {
      return Promise.reject("faghat bayad tehran bashi!");
    }
    return val;
  }),
  // body("address").notEmpty().isString().trim().escape(),
  body("driveLicense").isBoolean(),
];

exports.userUpdateValidator = [
  body("email").isEmail().trim().escape(),
  body("address").notEmpty().isString().trim().escape(),
  body("driveLicense").isBoolean(),
];
