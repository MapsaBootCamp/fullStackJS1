const express = require("express");
const { userController } = require("../controller").userApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

function logUserRoute(req, res, next) {
  console.log("user route");
  next();
}

router.use(logUserRoute);

router.post("/login", userController.login);
router
  .route("/")
  .get(tokenAuthentication, userController.getAll)
  .post(userValidator.userCreateValidator, checkError, userController.create);
router.get("/:id/info", userController.get);
router.put("/:id/update", userController.update);
router.delete("/:id/remove", userController.delete);

module.exports = router;
