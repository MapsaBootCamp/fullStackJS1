const express = require("express");
const { userController } = require("../controller").userApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const router = express.Router();

function logUserRoute(req, res, next) {
  console.log("user route");
  next();
}

router.use(logUserRoute);

router.get("/", userController.getAll);
router.post(
  "/",
  userValidator.userCreateValidator,
  checkError,
  userController.create
);
router.get("/:id", userController.get);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
