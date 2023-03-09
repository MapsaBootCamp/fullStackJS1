const express = require("express");
const { rentApp } = require("../controller");
const { tokenAuthentication } = require("../middlewares/auth");
const checkError = require("../middlewares/validator");
const { rentValidators } = require("../validators");

const router = express.Router();

router.post(
  "/add",
  tokenAuthentication,
  rentValidators.addToRentTable,
  checkError,
  rentApp.rentController.makeRent
);

module.exports = router;
