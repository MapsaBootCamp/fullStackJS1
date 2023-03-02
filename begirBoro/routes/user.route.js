const express = require("express");
const { userController } = require("../controller").userApp;

const router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userController.get);
router.put("/:id", userController.update);

module.exports = router;
