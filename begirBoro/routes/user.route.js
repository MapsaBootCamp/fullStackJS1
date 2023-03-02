const express = require("express");
const { userController } = require("../controller").userApp;

const router = express.Router();

router.get("/:id", userController.get);

module.exports = router;
