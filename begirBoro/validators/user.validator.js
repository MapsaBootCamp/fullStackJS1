const { body, check } = require("express-validator");
const db = require("../db");

exports.userCreateValidator = [
  body("email").isEmail().trim().escape(),
  check("email").custom(async (val) => {
    if (
      await db.user.findFirst({
        where: {
          email: val,
        },
      })
    ) {
      return Promise.reject("chenin useri darim!");
    }
    return val;
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
