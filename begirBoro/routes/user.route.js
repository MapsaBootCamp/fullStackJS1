const express = require("express");
const { userController } = require("../controller").userApp;

const router = express.Router();

function logUserRoute(req, res, next) {
  console.log("user route");
  next();
}

router.use(logUserRoute);

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.get);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
