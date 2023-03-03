const express = require("express");
const { vehicleController } = require("../controller").vehicleApp;

const router = express.Router();

function logVehicleRoute(req, res, next) {
  console.log("vehicle route");
  next();
}

router.use(logVehicleRoute);

router.get("/", vehicleController.getAll);
router.get("/:id", vehicleController.get);

module.exports = router;
